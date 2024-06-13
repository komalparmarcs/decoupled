<?php

declare(strict_types=1);

namespace Drupal\graphql_compose\Plugin\GraphQL\SchemaExtension;

use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\graphql\Plugin\GraphQL\SchemaExtension\SdlSchemaExtensionPluginBase as GSdlSchemaExtensionPluginBase;
use Drupal\graphql_compose\Plugin\GraphQLComposeEntityTypeManager;
use Drupal\graphql_compose\Plugin\GraphQLComposeFieldTypeManager;
use Drupal\graphql_compose\Plugin\GraphQLComposeSchemaTypeManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Adds Entity Type GraphQL Compose plugins to the GraphQL API.
 *
 * @deprecated in graphql_compose:1.2.0
 *   and is removed from graphql_compose:1.3.0.
 *   Use ResolverOnlySchemaExtensionPluginBase or
 *   graphql:SdlSchemaExtensionPluginBase instead.
 *
 *   @see https://www.drupal.org/project/graphql_compose/issues/3416642
 *
 * @internal
 */
abstract class SdlSchemaExtensionPluginBase extends GSdlSchemaExtensionPluginBase {

  /**
   * Entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected EntityTypeManagerInterface $entityTypeManager;

  /**
   * Entity field manager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  protected EntityFieldManagerInterface $entityFieldManager;

  /**
   * Entity type plugin manager.
   *
   * @var \Drupal\graphql_compose\Plugin\GraphQLComposeEntityTypeManager
   */
  protected GraphQLComposeEntityTypeManager $gqlEntityTypeManager;

  /**
   * Field type plugin manager.
   *
   * @var \Drupal\graphql_compose\Plugin\GraphQLComposeFieldTypeManager
   */
  protected GraphQLComposeFieldTypeManager $gqlFieldTypeManager;

  /**
   * SDL type plugin manager.
   *
   * @var \Drupal\graphql_compose\Plugin\GraphQLComposeSchemaTypeManager
   */
  protected GraphQLComposeSchemaTypeManager $gqlSchemaTypeManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = parent::create(
      $container,
      $configuration,
      $plugin_id,
      $plugin_definition,
    );

    $instance->entityTypeManager = $container->get('entity_type.manager');
    $instance->entityFieldManager = $container->get('entity_field.manager');
    $instance->gqlEntityTypeManager = $container->get('graphql_compose.entity_type_manager');
    $instance->gqlFieldTypeManager = $container->get('graphql_compose.field_type_manager');
    $instance->gqlSchemaTypeManager = $container->get('graphql_compose.schema_type_manager');

    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  protected function loadDefinitionFile($type) {
    @trigger_error('\Drupal\graphql_compose\Plugin\GraphQL\SchemaExtension\SdlSchemaExtensionPluginBase is deprecated in graphql_compose:1.2.0 and is removed from graphql_compose:1.3.0. See https://www.drupal.org/project/graphql_compose/issues/3416642', E_USER_DEPRECATED);

    try {
      return parent::loadDefinitionFile($type);
    }
    catch (InvalidPluginDefinitionException $e) {
      // Ignore this exception from parent.
      // We are not concerned with the schema file not existing.
      return NULL;
    }
  }

}
