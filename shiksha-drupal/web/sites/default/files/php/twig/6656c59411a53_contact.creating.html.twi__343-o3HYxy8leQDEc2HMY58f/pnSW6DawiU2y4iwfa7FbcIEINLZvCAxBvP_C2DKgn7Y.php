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

/* @help_topics/contact.creating.html.twig */
class __TwigTemplate_c41b5196dd5bfa274ae3eceeaaf60447 extends Template
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
        // line 8
        ob_start();
        echo t("Contact forms", array());
        $context["contact_link_text"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 9
        $context["contact_link"] = $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\help\HelpTwigExtension']->getRouteLink($this->sandbox->ensureToStringAllowed(($context["contact_link_text"] ?? null), 9, $this->source), "entity.contact_form.collection"));
        // line 10
        $context["adding_fields_topic"] = $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\help\HelpTwigExtension']->getTopicLink("contact.adding_fields"));
        // line 11
        echo "<h2>";
        echo t("Goal", array());
        echo "</h2>
<p>";
        // line 12
        echo t("Create a new site-wide contact form.", array());
        echo "</p>
<h2>";
        // line 13
        echo t("Steps", array());
        echo "</h2>
<ol>
  <li>";
        // line 15
        echo t("In the <em>Manage</em> administrative menu, navigate to <em>Structure</em> &gt; <em>@contact_link</em>.", array("@contact_link" => ($context["contact_link"] ?? null), ));
        echo "</li>
  <li>";
        // line 16
        echo t("Click <em>Add contact form</em>.", array());
        echo "</li>
  <li>";
        // line 17
        echo t("Fill in the <em>Label</em> (title) for the form, <em>Recipients</em>, and optionally the other settings.", array());
        echo "</li>
  <li>";
        // line 18
        echo t("Click <em>Save</em>. You should see your new contact form in the table, along with a link to view it.", array());
        echo "</li>
  <li>";
        // line 19
        echo t("The contact form will always have <em>Subject</em> and <em>Message</em> fields. If you want to add more fields, follow the steps in @adding_fields_topic.", array("@adding_fields_topic" => ($context["adding_fields_topic"] ?? null), ));
        echo "</li>
</ol>";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "@help_topics/contact.creating.html.twig";
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
        return array (  77 => 19,  73 => 18,  69 => 17,  65 => 16,  61 => 15,  56 => 13,  52 => 12,  47 => 11,  45 => 10,  43 => 9,  39 => 8,);
    }

    public function getSourceContext()
    {
        return new Source("{% line 8 %}{% set contact_link_text %}{% trans %}Contact forms{% endtrans %}{% endset %}
{% set contact_link = render_var(help_route_link(contact_link_text, 'entity.contact_form.collection')) %}
{% set adding_fields_topic = render_var(help_topic_link('contact.adding_fields')) %}
<h2>{% trans %}Goal{% endtrans %}</h2>
<p>{% trans %}Create a new site-wide contact form.{% endtrans %}</p>
<h2>{% trans %}Steps{% endtrans %}</h2>
<ol>
  <li>{% trans %}In the <em>Manage</em> administrative menu, navigate to <em>Structure</em> &gt; <em>{{ contact_link }}</em>.{% endtrans %}</li>
  <li>{% trans %}Click <em>Add contact form</em>.{% endtrans %}</li>
  <li>{% trans %}Fill in the <em>Label</em> (title) for the form, <em>Recipients</em>, and optionally the other settings.{% endtrans %}</li>
  <li>{% trans %}Click <em>Save</em>. You should see your new contact form in the table, along with a link to view it.{% endtrans %}</li>
  <li>{% trans %}The contact form will always have <em>Subject</em> and <em>Message</em> fields. If you want to add more fields, follow the steps in {{ adding_fields_topic }}.{% endtrans %}</li>
</ol>", "@help_topics/contact.creating.html.twig", "/var/www/html/web/core/modules/contact/help_topics/contact.creating.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 8, "trans" => 8);
        static $filters = array("escape" => 15);
        static $functions = array("render_var" => 9, "help_route_link" => 9, "help_topic_link" => 10);

        try {
            $this->sandbox->checkSecurity(
                ['set', 'trans'],
                ['escape'],
                ['render_var', 'help_route_link', 'help_topic_link']
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
