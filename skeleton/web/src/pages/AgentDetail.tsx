import { useParams, useNavigate } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';
import { useEffect } from 'react';
import type { BundleManifest } from '../../../shared/types/bundle';

export default function AgentDetail() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { config, loading, error } = useConfig();

  // Find the agent bundle
  const agent: BundleManifest | undefined = config?.bundles.find(
    (bundle) => bundle.id === agentId
  );

  // Handle invalid bundle IDs - redirect to home with error
  useEffect(() => {
    if (!loading && config && !agent) {
      navigate('/', { state: { error: 'Agent not found' } });
    }
  }, [loading, config, agent, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agent details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Configuration</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!config || !agent) {
    return null;
  }

  const installCommand = `kiro-agent install ${agent.id}`;
  const isFeatured = config.featured.includes(agent.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800 mb-4 flex items-center"
          >
            <span className="mr-2">←</span> Back to Marketplace
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{config.branding.name}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">{agent.name}</h2>
                {isFeatured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-lg mb-2">{agent.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>v{agent.version}</span>
                <span>•</span>
                <span>by {agent.author.name}</span>
              </div>
            </div>
            {agent.previewImage && (
              <img
                src={agent.previewImage}
                alt={agent.name}
                className="w-24 h-24 object-cover rounded-lg ml-6"
              />
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {agent.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h3>
          <p className="text-gray-600 mb-4">
            Install this agent bundle with a single command:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm flex items-center justify-between">
            <code>{installCommand}</code>
            <button
              onClick={() => navigator.clipboard.writeText(installCommand)}
              className="ml-4 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Long Description */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">About</h3>
          <p className="text-gray-700 leading-relaxed">{agent.longDescription}</p>
        </div>

        {/* Components */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Included Components</h3>
          
          {/* MCP Servers */}
          {agent.components.mcpServers && agent.components.mcpServers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">🔌</span> MCP Servers ({agent.components.mcpServers.length})
              </h4>
              <div className="space-y-3">
                {agent.components.mcpServers.map((server, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900">{server.name}</p>
                    <p className="text-sm text-gray-600 font-mono mt-1">
                      {server.command} {server.args.join(' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Steering Files */}
          {agent.components.steeringFiles && agent.components.steeringFiles.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📋</span> Steering Files ({agent.components.steeringFiles.length})
              </h4>
              <div className="space-y-3">
                {agent.components.steeringFiles.map((file, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900">{file.filename}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Inclusion: <span className="font-mono">{file.inclusion}</span>
                      {file.fileMatchPattern && (
                        <span className="ml-2">
                          (Pattern: <span className="font-mono">{file.fileMatchPattern}</span>)
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hooks */}
          {agent.components.hooks && agent.components.hooks.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">⚡</span> Hooks ({agent.components.hooks.length})
              </h4>
              <div className="space-y-3">
                {agent.components.hooks.map((hook, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900">{hook.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Trigger: <span className="font-mono">{hook.trigger}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Action: <span className="font-mono">{hook.action}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spec Templates */}
          {agent.components.specTemplates && agent.components.specTemplates.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📝</span> Spec Templates ({agent.components.specTemplates.length})
              </h4>
              <div className="space-y-3">
                {agent.components.specTemplates.map((template, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900">{template.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Type: <span className="font-mono">{template.type}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      File: <span className="font-mono">{template.filename}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No components message */}
          {(!agent.components.mcpServers || agent.components.mcpServers.length === 0) &&
           (!agent.components.steeringFiles || agent.components.steeringFiles.length === 0) &&
           (!agent.components.hooks || agent.components.hooks.length === 0) &&
           (!agent.components.specTemplates || agent.components.specTemplates.length === 0) && (
            <p className="text-gray-500 italic">No components included in this bundle.</p>
          )}
        </div>

        {/* Example Use Cases */}
        {agent.examples && agent.examples.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Example Use Cases</h3>
            <div className="space-y-4">
              {agent.examples.map((example, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-900 mb-1">{example.title}</h4>
                  <p className="text-gray-700 mb-2">{example.description}</p>
                  {example.prompt && (
                    <div className="bg-gray-50 p-3 rounded mt-2">
                      <p className="text-sm text-gray-600 mb-1">Example prompt:</p>
                      <p className="text-sm font-mono text-gray-800">{example.prompt}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dependencies */}
        {agent.dependencies && (agent.dependencies.external || agent.dependencies.kiroVersion) && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Dependencies</h3>
            {agent.dependencies.kiroVersion && (
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Minimum Kiro Version:</span> {agent.dependencies.kiroVersion}
              </p>
            )}
            {agent.dependencies.external && agent.dependencies.external.length > 0 && (
              <div>
                <p className="font-semibold text-gray-700 mb-2">External Dependencies:</p>
                <ul className="list-disc list-inside space-y-1">
                  {agent.dependencies.external.map((dep, idx) => (
                    <li key={idx} className="text-gray-600">{dep}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Author Info */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Author</h3>
          <p className="text-gray-700">
            <span className="font-semibold">{agent.author.name}</span>
            {agent.author.email && (
              <span className="ml-2">
                • <a href={`mailto:${agent.author.email}`} className="text-indigo-600 hover:text-indigo-800">
                  {agent.author.email}
                </a>
              </span>
            )}
            {agent.author.url && (
              <span className="ml-2">
                • <a href={agent.author.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                  Website
                </a>
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(agent.createdAt).toLocaleDateString()} • 
            Updated: {new Date(agent.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </main>
    </div>
  );
}
