<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* admin.auth.twig */
class __TwigTemplate_67012e23403a5e6ffa9a2d8a950ad157 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "

";
        // line 3
        if ( !($context["code"] ?? null)) {
            // line 4
            echo "
    <div class=\"wp-sb wp-sb--page wp-sb--welcome-page\">
        <div class=\"wp-sb--message-container\">
            ";
            // line 7
            if ((($context["flash"] ?? null) && twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "messages", [], "any", false, false, false, 7))) {
                // line 8
                echo "                ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "messages", [], "any", false, false, false, 8));
                foreach ($context['_seq'] as $context["_key"] => $context["message"]) {
                    // line 9
                    echo "                    <div class=\"notice notice-success is-dismissible\">
                        <p>";
                    // line 10
                    echo twig_escape_filter($this->env, $context["message"], "html", null, true);
                    echo "</p>
                    </div>
                ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['message'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 13
                echo "            ";
            }
            // line 14
            echo "
            ";
            // line 15
            if (($context["error"] ?? null)) {
                // line 16
                echo "                <div class=\"notice notice-error is-dismissible\">
                    <p>";
                // line 17
                echo twig_escape_filter($this->env, ($context["error"] ?? null), "html", null, true);
                echo "</p>
                </div>
            ";
            }
            // line 20
            echo "
            ";
            // line 21
            if ((($context["flash"] ?? null) && twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "errors", [], "any", false, false, false, 21))) {
                // line 22
                echo "                ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "errors", [], "any", false, false, false, 22));
                foreach ($context['_seq'] as $context["_key"] => $context["message"]) {
                    // line 23
                    echo "                    <div class=\"notice notice-error is-dismissible\">
                        <p>";
                    // line 24
                    echo twig_escape_filter($this->env, $context["message"], "html", null, true);
                    echo "</p>
                    </div>
                ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['message'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 27
                echo "            ";
            }
            // line 28
            echo "        </div>

        <header class=\"wp-sb--welcome-page_header\">
            <div class=\"wp-sb--row\">
                <div class=\"wp-sb--col\">
                    <img class=\"logo\" src=\"";
            // line 33
            echo twig_escape_filter($this->env, $this->env->getFunction('makeurl')->getCallable()("images/sb-logo__full.svg"), "html", null, true);
            echo "\" alt=\"simplybook.me logo\" />
                </div>
                <div class=\"wp-sb--col col-sign-up\">
                    <p class=\"wp-sb--p wp-sb--p_primary sign-in-row\">";
            // line 36
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Already have an account?"), "html", null, true);
            echo " <a class=\"btn btn--secondary-outline sb-button sb-login\" href=\"";
            echo twig_escape_filter($this->env, ($context["login_url"] ?? null), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Sign in here"), "html", null, true);
            echo "</a></p>
                </div>
            </div>
        </header>

        <main class=\"wp-sb--welcome-page_main\">
            <article class=\"wp-sb--row wp-sb--row_hero\">
                <div class=\"wp-sb--col wp-sb--col_content\">
                    <div class=\"wp-sb--section-header\">
                        <h2 class=\"wp-sb--title wp-sb--title_h2 --has-subtitle\">";
            // line 45
            echo $this->env->getFunction('__')->getCallable()("Online Booking System<br/> for <span class='color-primary'>all service based industries</span>");
            echo "</h2>
                        <p class=\"wp-sb--p wp-sb--p_secondary\">";
            // line 46
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Simply define your services and providers, display their availability, and you will have clients both old and new making bookings 24/7."), "html", null, true);
            echo "</p>
                    </div>


                    <div class=\"wp-sb--btn-bar\">
                        <div class=\"wp-sb--btn-bar_row\">
                            <a class=\"btn btn--primary sb-button sb-login\" href=\"";
            // line 52
            echo twig_escape_filter($this->env, ($context["register_url"] ?? null), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Create free account"), "html", null, true);
            echo "</a>
                        </div>
                        <p class=\"wp-sb--p wp-sb--p_primary info-lable\">";
            // line 54
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("100% free. No credit card needed."), "html", null, true);
            echo "</p>
                    </div>

                    <p class=\"wp-sb--p wp-sb--p_small wp-sb--p_secondary\">";
            // line 57
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("By continuing, Wordpress will share your name, email, company name and domain with SimplyBook.me"), "html", null, true);
            echo "</p>
                    <br>
                    <p class=\"wp-sb--p wp-sb--p_small wp-sb--p_secondary\">";
            // line 59
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("We’re committed to your privacy. SimplyBook.me uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our privacy Policy"), "html", null, true);
            echo "</p>
                </div>

                <div class=\"wp-sb--col wp-sb--col_picture\">
                    <picture class=\"hero-img_wrapper\">
                        <img style=\"max-height: 544px\" class=\"hero-img\" src=\"";
            // line 64
            echo twig_escape_filter($this->env, $this->env->getFunction('makeurl')->getCallable()("images/hero-image.png"), "html", null, true);
            echo "\" alt=\"hero image\">
                    </picture>
                </div>
            </article>
        </main>

        <footer class=\"wp-sb--welcome-page_footer\">
            <div class=\"sb-server-selector\">
                ";
            // line 72
            $context["servers"] = [["name" => "simplybook.me (.it, .asia, .net)", "value" => "simplybook.me"], ["name" => "simplybook.plus", "value" => "simplybook.plus"]];
            // line 76
            echo "
                ";
            // line 77
            $context["isSelected"] = false;
            // line 78
            echo "
                <div class=\"wp-sb--form-group\">
                    <label for=\"sb-server wp-sb--label\">";
            // line 80
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Server"), "html", null, true);
            echo "</label>
                    <select id=\"sb-server\" class=\"wp-sb--select select-server\">
                        ";
            // line 82
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["servers"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["server"]) {
                // line 83
                echo "                            ";
                if ((twig_get_attribute($this->env, $this->source, $context["server"], "value", [], "any", false, false, false, 83) == ($context["api_domain"] ?? null))) {
                    // line 84
                    echo "                                ";
                    $context["isSelected"] = true;
                    // line 85
                    echo "                                <option value=\"";
                    echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["server"], "value", [], "any", false, false, false, 85), "html", null, true);
                    echo "\" selected>";
                    echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["server"], "name", [], "any", false, false, false, 85), "html", null, true);
                    echo "</option>
                            ";
                } else {
                    // line 87
                    echo "                                <option value=\"";
                    echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["server"], "value", [], "any", false, false, false, 87), "html", null, true);
                    echo "\">";
                    echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["server"], "name", [], "any", false, false, false, 87), "html", null, true);
                    echo "</option>
                            ";
                }
                // line 89
                echo "                        ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['server'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 90
            echo "                        ";
            if ( !($context["isSelected"] ?? null)) {
                // line 91
                echo "                            <option value=\"";
                echo twig_escape_filter($this->env, ($context["api_domain"] ?? null), "html", null, true);
                echo "\" selected>";
                echo twig_escape_filter($this->env, ($context["api_domain"] ?? null), "html", null, true);
                echo "</option>
                        ";
            }
            // line 93
            echo "                    </select>
                </div>
                <button type=\"button\" class=\"btn btn--primary\" id=\"sb-server-custom\">";
            // line 95
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("add custom"), "html", null, true);
            echo "</button>
            </div>

            <a href=\"";
            // line 98
            echo twig_escape_filter($this->env, $this->env->getFunction('makeUrl')->getCallable()(["sbpage" => "check", "amp_symbol" => "%amp%"]), "html", null, true);
            echo "\" class=\"link check-system v1\">";
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Check system"), "html", null, true);
            echo "</a>
        </footer>
    </div>

";
        } else {
            // line 104
            echo "<div  class=\"sb-plugin-container booking-system\">
    <h2>";
            // line 105
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Authorization Confirmation"), "html", null, true);
            echo "</h2>


    ";
            // line 108
            if ((($context["flash"] ?? null) && twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "messages", [], "any", false, false, false, 108))) {
                // line 109
                echo "        ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "messages", [], "any", false, false, false, 109));
                foreach ($context['_seq'] as $context["_key"] => $context["message"]) {
                    // line 110
                    echo "            <div class=\"notice notice-success is-dismissible\">
                <p>";
                    // line 111
                    echo twig_escape_filter($this->env, $context["message"], "html", null, true);
                    echo "</p>
            </div>
        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['message'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 114
                echo "    ";
            }
            // line 115
            echo "
    ";
            // line 116
            if (($context["error"] ?? null)) {
                // line 117
                echo "        <div class=\"notice notice-error is-dismissible\">
            <p>";
                // line 118
                echo twig_escape_filter($this->env, ($context["error"] ?? null), "html", null, true);
                echo "</p>
        </div>
    ";
            }
            // line 121
            echo "
    ";
            // line 122
            if ((($context["flash"] ?? null) && twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "errors", [], "any", false, false, false, 122))) {
                // line 123
                echo "        ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(twig_get_attribute($this->env, $this->source, ($context["flash"] ?? null), "errors", [], "any", false, false, false, 123));
                foreach ($context['_seq'] as $context["_key"] => $context["message"]) {
                    // line 124
                    echo "            <div class=\"notice notice-error is-dismissible\">
                <p>";
                    // line 125
                    echo twig_escape_filter($this->env, $context["message"], "html", null, true);
                    echo "</p>
            </div>
        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['message'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 128
                echo "    ";
            }
            // line 129
            echo "
    <p>";
            // line 130
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Please enter the code you received in your email to confirm your authorization:"), "html", null, true);
            echo "</p>

    <form action=\"";
            // line 132
            echo twig_escape_filter($this->env, $this->env->getFunction('makeUrl')->getCallable()(["m" => "confirm", "amp_symbol" => "%amp%"]), "html", null, true);
            echo "\" method=\"post\">
        <input type=\"hidden\" name=\"_wpnonce\" value=\"";
            // line 133
            echo twig_escape_filter($this->env, ($context["_wpnonce"] ?? null));
            echo "\">
        <input type=\"hidden\" name=\"code\" value=\"";
            // line 134
            echo twig_escape_filter($this->env, ($context["code"] ?? null));
            echo "\">
        <input type=\"hidden\" name=\"company_login\" value=\"";
            // line 135
            echo twig_escape_filter($this->env, ($context["company_login"] ?? null));
            echo "\">
        <input type=\"hidden\" name=\"session_id\" value=\"";
            // line 136
            echo twig_escape_filter($this->env, ($context["session_id"] ?? null));
            echo "\">
        <input type=\"hidden\" name=\"domain\" value=\"";
            // line 137
            echo twig_escape_filter($this->env, ($context["domain"] ?? null));
            echo "\">

        <label for=\"verification_code\">";
            // line 139
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Confirmation Code:"), "html", null, true);
            echo "</label>
        <input type=\"text\" id=\"verification_code\" name=\"verification_code\" value=\"";
            // line 140
            echo twig_escape_filter($this->env, ($context["verification_code"] ?? null));
            echo "\" placeholder=\"XXXXXX\" required>
        <br><br>
        <input type=\"submit\" class=\"button button-primary\" value=\"";
            // line 142
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Confirm"), "html", null, true);
            echo "\">
    </form>

    <footer class=\"wp-sb--welcome-page_footer\">
        <a href=\"";
            // line 146
            echo twig_escape_filter($this->env, $this->env->getFunction('makeUrl')->getCallable()(["sbpage" => "check", "amp_symbol" => "%amp%"]), "html", null, true);
            echo "\" class=\"check-system v2\">";
            echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Check system"), "html", null, true);
            echo "</a>
    </footer>
</div>
";
        }
        // line 150
        echo "

<script type=\"application/javascript\">
    try {
        localStorage.removeItem('apiData');
        localStorage.removeItem('apiDataExpiry');
        localStorage.removeItem('cachedLogin');

        document.addEventListener(\"DOMContentLoaded\", function () {
            function setServerF(server) {
                var setUrl = \"";
        // line 160
        echo $this->env->getFunction('makeUrl')->getCallable()(["m" => "setserver", "amp_symbol" => "%amp%"]);
        echo "\";

                jQuery.ajax({
                    url: setUrl,
                    type: 'POST',
                    data: {
                        'domain': server,
                        '_wpnonce': \"";
        // line 167
        echo twig_escape_filter($this->env, ($context["_wpnonce"] ?? null));
        echo "\"
                    },
                    success: function (data) {
                        window.location.reload();
                    }
                });
            }

            jQuery(document).on('change', '#sb-server', function (){
                var server = jQuery(this).val();
                setServerF(server);
            });

            jQuery(document).on('click', '#sb-server-custom', function (){
                var server = prompt(\"";
        // line 181
        echo twig_escape_filter($this->env, $this->env->getFunction('__')->getCallable()("Please enter server domain name (not company custom domain). For example: simplybook.vip"), "html", null, true);
        echo "\", \"\");
                if (server != null) {
                    setServerF(server);
                }
            });
        });


    } catch (e) {
        console.log(e);
    }
</script>";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "admin.auth.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  434 => 181,  417 => 167,  407 => 160,  395 => 150,  386 => 146,  379 => 142,  374 => 140,  370 => 139,  365 => 137,  361 => 136,  357 => 135,  353 => 134,  349 => 133,  345 => 132,  340 => 130,  337 => 129,  334 => 128,  325 => 125,  322 => 124,  317 => 123,  315 => 122,  312 => 121,  306 => 118,  303 => 117,  301 => 116,  298 => 115,  295 => 114,  286 => 111,  283 => 110,  278 => 109,  276 => 108,  270 => 105,  267 => 104,  257 => 98,  251 => 95,  247 => 93,  239 => 91,  236 => 90,  230 => 89,  222 => 87,  214 => 85,  211 => 84,  208 => 83,  204 => 82,  199 => 80,  195 => 78,  193 => 77,  190 => 76,  188 => 72,  177 => 64,  169 => 59,  164 => 57,  158 => 54,  151 => 52,  142 => 46,  138 => 45,  122 => 36,  116 => 33,  109 => 28,  106 => 27,  97 => 24,  94 => 23,  89 => 22,  87 => 21,  84 => 20,  78 => 17,  75 => 16,  73 => 15,  70 => 14,  67 => 13,  58 => 10,  55 => 9,  50 => 8,  48 => 7,  43 => 4,  41 => 3,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "admin.auth.twig", "/var/www/html/wp-content/plugins/simplybook/content/templates/admin.auth.twig");
    }
}
