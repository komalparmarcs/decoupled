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

/* @help_topics/config_translation.overview.html.twig */
class __TwigTemplate_c21b1103e67e6ae63de165cdbb0a8790 extends Template
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
        echo t("Configuration translation", array());
        $context["config_translation_link_text"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 9
        $context["config_translation_link"] = $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\help\HelpTwigExtension']->getRouteLink($this->sandbox->ensureToStringAllowed(($context["config_translation_link_text"] ?? null), 9, $this->source), "config_translation.mapper_list"));
        // line 10
        $context["config_overview_topic"] = $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\help\HelpTwigExtension']->getTopicLink("core.config_overview"));
        // line 11
        $context["language_add_topic"] = $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\help\HelpTwigExtension']->getTopicLink("language.add"));
        // line 12
        echo "<h2>";
        echo t("Goal", array());
        echo "</h2>
<p>";
        // line 13
        echo t("Translate your site configuration to another language. See @language_add_topic if you need to add a new language.", array("@language_add_topic" => ($context["language_add_topic"] ?? null), ));
        echo "</p>
<h2>";
        // line 14
        echo t("Steps", array());
        echo "</h2>
<ol>
  <li>";
        // line 16
        echo t("In the <em>Manage</em> administrative menu, navigate to <em>Configuration</em> &gt; <em>Region and language</em> &gt; <em>@config_translation_link</em>.", array("@config_translation_link" => ($context["config_translation_link"] ?? null), ));
        echo "</li>
  <li>";
        // line 17
        echo t("Find either the configuration entity type or the simple configuration item that you want to translate in the <em>Label</em> column of the list. Click <em>List</em> under <em>Operations</em> for a configuration entity, or <em>Translate</em> for simple configuration. (See @config_overview_topic to learn more about types of configuration and configuration entities.)", array("@config_overview_topic" => ($context["config_overview_topic"] ?? null), ));
        echo "</li>
  <li>";
        // line 18
        echo t("For configuration entities, find the specific entity that you want to translate on the next page, and click <em>Translate</em> under <em>Operations</em>.", array());
        echo "</li>
  <li>";
        // line 19
        echo t("Enter translations for the translatable text fields for the configuration item, and save.", array());
        echo "</li>
</ol>";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "@help_topics/config_translation.overview.html.twig";
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
        return array (  75 => 19,  71 => 18,  67 => 17,  63 => 16,  58 => 14,  54 => 13,  49 => 12,  47 => 11,  45 => 10,  43 => 9,  39 => 8,);
    }

    public function getSourceContext()
    {
        return new Source("{% line 8 %}{% set config_translation_link_text %}{% trans %}Configuration translation{% endtrans %}{% endset %}
{% set config_translation_link = render_var(help_route_link(config_translation_link_text, 'config_translation.mapper_list')) %}
{% set config_overview_topic = render_var(help_topic_link('core.config_overview')) %}
{% set language_add_topic = render_var(help_topic_link('language.add')) %}
<h2>{% trans %}Goal{% endtrans %}</h2>
<p>{% trans %}Translate your site configuration to another language. See {{ language_add_topic }} if you need to add a new language.{% endtrans %}</p>
<h2>{% trans %}Steps{% endtrans %}</h2>
<ol>
  <li>{% trans %}In the <em>Manage</em> administrative menu, navigate to <em>Configuration</em> &gt; <em>Region and language</em> &gt; <em>{{ config_translation_link }}</em>.{% endtrans %}</li>
  <li>{% trans %}Find either the configuration entity type or the simple configuration item that you want to translate in the <em>Label</em> column of the list. Click <em>List</em> under <em>Operations</em> for a configuration entity, or <em>Translate</em> for simple configuration. (See {{ config_overview_topic }} to learn more about types of configuration and configuration entities.){% endtrans %}</li>
  <li>{% trans %}For configuration entities, find the specific entity that you want to translate on the next page, and click <em>Translate</em> under <em>Operations</em>.{% endtrans %}</li>
  <li>{% trans %}Enter translations for the translatable text fields for the configuration item, and save.{% endtrans %}</li>
</ol>", "@help_topics/config_translation.overview.html.twig", "/var/www/html/web/core/modules/config_translation/help_topics/config_translation.overview.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 8, "trans" => 8);
        static $filters = array("escape" => 13);
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
