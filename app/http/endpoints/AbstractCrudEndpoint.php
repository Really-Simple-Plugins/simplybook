<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Helpers\Storage;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Http\Entities\AbstractEntity;
use SimplyBook\Exceptions\RestDataException;
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
        } catch (RestDataException $e) {
            return $this->sendHttpResponse($e->getData(), false, $e->getMessage(), $e->getResponseCode());
        } catch (\InvalidArgumentException $e) {
            return $this->sendHttpResponse([], false, $e->getMessage(), 400);
        } catch (\Throwable $e) {
            return $this->sendHttpResponse([], false, esc_html__('An unknown error occurred. Please try again later.', 'simplybook'), 400);
        }

        return $this->sendHttpResponse();
//        return WP_ERROR;
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
        } catch (RestDataException $e) {
            return $this->sendHttpResponse($e->getData(), false, $e->getMessage(), $e->getResponseCode());
        } catch (\InvalidArgumentException $e) {
            return $this->sendHttpResponse([], false, $e->getMessage(), 400);
        } catch (\Throwable $e) {
            return $this->sendHttpResponse([], false, esc_html__('An unknown error occurred. Please try again later.', 'simplybook'), 400);
        }

//        catch (\Throwable $e) {
//            $data = ($e instanceof RestDataException) ? $e->getData() : ['error' => $e->getMessage()];
//            return $this->sendHttpResponse($data, false, esc_html__(
//                'Something went wrong while updating.', 'simplybook'
//            ), 400);
//        }

        return $this->sendHttpResponse();
//        return WP_ERROR;added better error handling
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
}