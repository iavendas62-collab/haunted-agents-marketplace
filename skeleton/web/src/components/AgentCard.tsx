import type { BundleManifest } from '../../../shared/types/bundle';

interface AgentCardProps {
  agent: BundleManifest;
  onClick: (agentId: string) => void;
  isFeatured?: boolean;
}

export default function AgentCard({ agent, onClick, isFeatured = false }: AgentCardProps) {
  const handleClick = () => {
    onClick(agent.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(agent.id);
    }
  };

  // Count components
  const componentCounts = {
    mcpServers: agent.components.mcpServers?.length || 0,
    steeringFiles: agent.components.steeringFiles?.length || 0,
    hooks: agent.components.hooks?.length || 0,
    specTemplates: agent.components.specTemplates?.length || 0,
  };

  return (
    <article
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${agent.name}`}
    >
      {/* Preview Image */}
      {agent.previewImage && (
        <div className="w-full h-56 overflow-hidden">
          <img
            src={agent.previewImage}
            alt={`${agent.name} preview`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            style={{ objectPosition: 'center 85%' }}
          />
        </div>
      )}

      <div className="p-6">
        {/* Featured Badge */}
        {isFeatured && (
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Bundle Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{agent.description}</p>

        {/* Component Icons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          {componentCounts.mcpServers > 0 && (
            <div
              className="flex items-center gap-1 text-xs text-gray-700"
              title={`${componentCounts.mcpServers} MCP Server${componentCounts.mcpServers > 1 ? 's' : ''}`}
            >
              <span className="text-lg" aria-label="MCP Servers">🔌</span>
              <span>{componentCounts.mcpServers}</span>
            </div>
          )}

          {componentCounts.steeringFiles > 0 && (
            <div
              className="flex items-center gap-1 text-xs text-gray-700"
              title={`${componentCounts.steeringFiles} Steering File${componentCounts.steeringFiles > 1 ? 's' : ''}`}
            >
              <span className="text-lg" aria-label="Steering Files">🧭</span>
              <span>{componentCounts.steeringFiles}</span>
            </div>
          )}

          {componentCounts.hooks > 0 && (
            <div
              className="flex items-center gap-1 text-xs text-gray-700"
              title={`${componentCounts.hooks} Hook${componentCounts.hooks > 1 ? 's' : ''}`}
            >
              <span className="text-lg" aria-label="Hooks">🪝</span>
              <span>{componentCounts.hooks}</span>
            </div>
          )}

          {componentCounts.specTemplates > 0 && (
            <div
              className="flex items-center gap-1 text-xs text-gray-700"
              title={`${componentCounts.specTemplates} Spec Template${componentCounts.specTemplates > 1 ? 's' : ''}`}
            >
              <span className="text-lg" aria-label="Spec Templates">📋</span>
              <span>{componentCounts.specTemplates}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {agent.tags && agent.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {agent.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
              >
                {tag}
              </span>
            ))}
            {agent.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs text-gray-500">
                +{agent.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
