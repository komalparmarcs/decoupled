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

/* @help_topics/user.create.html.twig */
class __TwigTemplate_616687207d51832cd0a1c52ea990a2d0 extends Template
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
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 7
        ob_start();
        echo t("People", array());
        $context["people_link_text"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 8
        $context["people_link"] = $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\help\HelpTwigExtension']->getRouteLink($this->sandbox->ensureToStringAllowed(($context["people_link_text"] ?? null), 8, $this->source), "entity.user.collection"));
        // line 9
        echo "<h2>";
        echo t("Goal", array());
        echo "</h2>
<p>";
        // line 10
        echo t("Create a new user account.", array());
        echo "</p>
<h2>";
        // line 11
        echo t("Steps", array());
        echo "</h2>
<ol>
  <li>";
        // line 13
        echo t("In the <em>Manage</em> administrative menu, navigate to <em>@people_link</em>.", array("@people_link" => ($context["people_link"] ?? null), ));
        echo "</li>
  <li>";
        // line 14
        echo t("Click <em>Add user</em>.", array());
        echo "</li>
  <li>";
        // line 15
        echo t("Enter the <em>Email address</em>, <em>Username</em>, and <em>Password</em> (twice) for the new user.", array());
        echo "</li>
  <li>";
        // line 16
        echo t("Verify that the <em>Roles</em> checked for the new user are correct.", array());
        echo "</li>
  <li>";
        // line 17
        echo t("If you want the new user to receive an email message notifying them of the new account, check <em>Notify user of new account</em>.", array());
        echo "</li>
  <li>";
        // line 18
        echo t("Optionally, change other settings on the form.", array());
        echo "</li>
  <li>";
        // line 19
        echo t("Click <em>Create new account</em>.", array());
        echo "</li>
  <li>";
        // line 20
        echo t("You will be left on the <em>Add user</em> page; repeat these steps if you have more user accounts to create.", array());
        echo "</li>
</ol>";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "@help_topics/user.create.html.twig";
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
        return array (  87 => 20,  83 => 19,  79 => 18,  75 => 17,  71 => 16,  67 => 15,  63 => 14,  59 => 13,  54 => 11,  50 => 10,  45 => 9,  43 => 8,  39 => 7,);
    }

    public function getSourceContext()
    {
        return new Source("{% line 7 %}{% set people_link_text %}{% trans %}People{% endtrans %}{% endset %}
{% set people_link = render_var(help_route_link(people_link_text, 'entity.user.collection')) %}
<h2>{% trans %}Goal{% endtrans %}</h2>
<p>{% trans %}Create a new user account.{% endtrans %}</p>
<h2>{% trans %}Steps{% endtrans %}</h2>
<ol>
  <li>{% trans %}In the <em>Manage</em> administrative menu, navigate to <em>{{ people_link }}</em>.{% endtrans %}</li>
  <li>{% trans %}Click <em>Add user</em>.{% endtrans %}</li>
  <li>{% trans %}Enter the <em>Email address</em>, <em>Username</em>, and <em>Password</em> (twice) for the new user.{% endtrans %}</li>
  <li>{% trans %}Verify that the <em>Roles</em> checked for the new user are correct.{% endtrans %}</li>
  <li>{% trans %}If you want the new user to receive an email message notifying them of the new account, check <em>Notify user of new account</em>.{% endtrans %}</li>
  <li>{% trans %}Optionally, change other settings on the form.{% endtrans %}</li>
  <li>{% trans %}Click <em>Create new account</em>.{% endtrans %}</li>
  <li>{% trans %}You will be left on the <em>Add user</em> page; repeat these steps if you have more user accounts to create.{% endtrans %}</li>
</ol>", "@help_topics/user.create.html.twig", "/var/www/html/web/core/modules/user/help_topics/user.create.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 7, "trans" => 7);
        static $filters = array("escape" => 13);
        static $functions = array("render_var" => 8, "help_route_link" => 8);

        try {
            $this->sandbox->checkSecurity(
                ['set', 'trans'],
                ['escape'],
                ['render_var', 'help_route_link']
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
