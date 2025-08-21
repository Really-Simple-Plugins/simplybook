<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Helpers\Storage;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Http\Entities\AbstractEntity;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Exceptions\FormException;
use SimplyBook\Interfaces\MultiEndpointInterface;

abstract class AbstractCrudEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    /**
     * The entity that this endpoint uses to process requests.
     */
    protected AbstractEntity $entity;

    public function __construct(AbstractEntity $entity)
    {
        $this->entity = $entity;
    }

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        $route = $this->entity->getInternalEndpoint();

        return [
            $route => [
                'methods' => \WP_REST_Server::READABLE.','.\WP_REST_Server::CREATABLE,
                'callback' => [$this, 'handleCollectionRequest'],
            ],
            $route.'/(?P<id>[0-9]+)' => [
                'methods' => \WP_REST_Server::READABLE.','.\WP_REST_Server::CREATABLE.','.\WP_REST_Server::EDITABLE.','.\WP_REST_Server::DELETABLE,
                'callback' => [$this, 'handleSingleRequest'],
            ],
        ];
    }

    /**
     * Handle entity collection requests.
     * @internal Override this method to process the collection request.
     */
    public function handleCollectionRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        $requestStorage = new Storage($request->get_params());

        switch ($request->get_method()) {
            case 'GET':
                return $this->getAllEntities();
            case 'POST':
                return $this->createItem($requestStorage);
            default:
                return $this->sendHttpResponse([], false, esc_html__('Method not allowed', 'simplybook'), 405);
        }

    }

    /**
     * Return all entities as a WP_REST_Response.
     * @internal Override this method if you want to customize the response.
     */
    protected function getAllEntities(): \WP_REST_Response
    {
        return $this->sendHttpResponse(
            $this->entity->all()
        );
    }

    /**
     * Create a new entity based on the request parameters. It will catch any
     * validation errors or exceptions thrown during the creation process.
     * @internal Override this method if you want to customize the logic.
     */
    protected function createItem(Storage $request): \WP_REST_Response
    {
        if ($request->isEmpty()) {
            return $this->sendHttpResponse([], false, esc_html__('Could not create entity, no data provided.', 'simplybook'), 405);
        }

        try {
            $this->entity->create(
                $request->all()
            );
        } catch (\Throwable $e) {
            return $this->processRequestThrowable($e, 'create');
        }

        $successMessage = $this->entity->name . ' ' . esc_html__('successfully saved!', 'simplybook');
        return $this->sendHttpResponse($this->entity->attributes(), true, $successMessage);
    }

    /**
     * Handle single entity requests.
     * @internal Override this method to handle GET, PUT, PATCH, POST, DELETE
     * requests for a single entity.
     */
    public function handleSingleRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        $requestStorage = new Storage($request->get_params());

        switch ($request->get_method()) {
            case 'GET':
                return $this->findEntity($requestStorage);
            case 'PUT':
            case 'PATCH':
            case 'POST':
                return $this->updateEntity($requestStorage);
            case 'DELETE':
                return $this->deleteEntity($requestStorage);
            default:
                return $this->sendHttpResponse([], false, esc_html__('Method not allowed', 'simplybook'), 405);
        }
    }

    /**
     * Get a single entity based on the request parameters. It will catch any
     * validation errors or exceptions thrown during the retrieval process.
     * @internal Override this method if you want to customize the logic.
     */
    protected function findEntity(Storage $request): \WP_REST_Response
    {
        try {
            $this->entity = $this->entity->find(
                $request->getString('id')
            );
        } catch (\Throwable $e) {
            return $this->sendHttpResponse([
                'error' => $e->getMessage()
            ], false, esc_html__('Entity not found!', 'simplybook'), 404);
        }

        return $this->sendHttpResponse($this->entity->attributes());
    }

    /**
     * Update an entity based on the request parameters. It will catch any
     * validation errors or exceptions thrown during the update process.
     * @internal Override this method if you want to customize the logic.
     */
    protected function updateEntity(Storage $request): \WP_REST_Response
    {
        try {
            $this->entity->fill($request->all());
            $this->entity->update();
        } catch (\Throwable $e) {
            return $this->processRequestThrowable($e, 'update');
        }

        $successMessage = $this->entity->name . ' ' . esc_html__('successfully saved!', 'simplybook');
        return $this->sendHttpResponse($this->entity->attributes(), true, $successMessage);
    }

    /**
     * Delete an entity based on the request parameters. It will catch any
     * validation errors or exceptions thrown during the deletion process.
     * @internal Override this method if you want to customize the logic.
     */
    protected function deleteEntity(Storage $request): \WP_REST_Response
    {
        try {
            $this->entity->id = $request->getString('id');
            $this->entity->delete();
        } catch (\Throwable $e) {
            return $this->sendHttpResponse([
                'error' => $e->getMessage()
            ], false, esc_html__('Something went wrong while deleting.', 'simplybook'), 400);
        }

        return $this->sendHttpResponse();
    }

    /**
     * Generically process any throwable that is caught while doing requests.
     * Child classes could overwrite this method to specifically handle
     * the throwable.
     */
    protected function processRequestThrowable(\Throwable $exception, string $action = ''): \WP_REST_Response
    {
        if ($exception instanceof RestDataException) {
            return $this->processRestDataException($exception, $action);
        }

        if ($exception instanceof FormException) {
            return new \WP_REST_Response([
                'message' => $exception->getMessage(),
                'errors' => $exception->getErrors()
            ], 403);
        }

        return $this->sendHttpResponse([], false, esc_html__('An unknown error occurred. Please try again later.', 'simplybook'), 400);
    }

    /**
     * Default behavior for processing {@see RestDataException}. Child classes
     * should overwrite for specific handling.
     */
    protected function processRestDataException(RestDataException $exception, string $action): \WP_REST_Response
    {
        switch ($action) {
            case 'update':
            case 'create':
                return $this->processAttributesException($exception);
            default:
                return $this->sendHttpResponse($exception->getData(), false, $exception->getMessage(), $exception->getResponseCode());
        }
    }

    /**
     * Method specifically for handling an attribute exceptions. It should create
     * translated, user-friendly, error messages based on the faulty attributes
     * that we receive in the SimplyBook response. Errors format should be
     * consistent with the entity validation method:
     * {@see \SimplyBook\Http\Entities\AbstractEntity::validate}
     */
    protected function processAttributesException(RestDataException $exception): \WP_REST_Response
    {
        $exceptionData = $exception->getData();
        if (empty($exceptionData['data'])) {
            return new \WP_REST_Response([
                'message' => esc_html__('An unknown error occurred while saving, please try again.', 'simplybook'),
            ], 403);
        }

        $faultyFields = $exceptionData['data'];
        $translatedErrors = $this->buildTranslatedErrors($faultyFields);

        return new \WP_REST_Response([
            'message' => esc_html__('An error occurred while saving, please try again.', 'simplybook'),
            'errors' => $translatedErrors,
        ], 403);
    }

    /**
     * Build a per-attribute list of translated, known, error messages from raw
     * validation errors. We do this because we want to show friendly,
     * translated, messages only for errors we recognize, grouped by attribute.
     *
     * Steps:
     * 1) Iterate the faulty fields; skip attributes without a known mapping.
     * 2) For each error string, scan the attribute's known
     *    "needle" => "translation" pairs.
     * 3) If a needle appears (case-insensitive), collect its translation once
     *    per attribute.
     * 4) Only include attributes that ended up with at least one translation.
     */
    protected function buildTranslatedErrors(array $faultyFields, array $knownErrors = []): array
    {
        $translatedByAttribute = [];

        if (empty($knownErrors)) {
            $knownErrors = $this->entity->getKnownErrors();
        }

        foreach ($faultyFields as $attribute => $errors) {
            if (!is_array($errors)) {
                continue;
            }

            // Keep untranslated errors for unknown errors
            if (!array_key_exists($attribute, $knownErrors)) {
                $translatedByAttribute[$attribute] = $errors;
                continue;
            }

            $knownAttributeErrors = $knownErrors[$attribute];
            $translations = [];
            $seen = [];

            foreach ($errors as $key => $error) {
                if (!is_string($error) || $error === '') {
                    continue;
                }

                // First add untranslated error so we won't lose it.
                $translations[$key] = $error;

                foreach ($knownAttributeErrors as $needle => $translation) {
                    if (empty($needle)) {
                        continue;
                    }

                    if (stripos($error, (string) $needle) !== false) {
                        if (!isset($seen[$translation])) {
                            // Override untranslated error
                            $translations[$key] = $translation;
                            $seen[$translation] = true;
                        } else {
                            // Remove untranslated error if already seen
                            unset($translations[$key]);
                        }
                        break;
                    }
                }
            }

            if ($translations !== []) {
                $translatedByAttribute[$attribute] = $translations;
            }
        }

        return $translatedByAttribute;
    }


}