import type { GenealogyNode } from '../data/genealogy';

interface Props {
  data: GenealogyNode;
}

function GenealogyBranch({ node }: { node: GenealogyNode }) {
  return (
    <li className={`gen-branch gen-link-${node.source === '성경' ? 'bible' : 'islamic'}`}>
      <GenealogyNodeCard node={node} />
      {node.children && node.children.length > 0 && (
        <ul className="gen-children">
          {node.children.map((child) => (
            <GenealogyBranch key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function GenealogyNodeCard({ node }: { node: GenealogyNode }) {
  return (
    <div className={`gen-node gen-node-source-${node.source === '성경' ? 'bible' : 'islamic'}`}>
      <span className="gen-node-badge">{node.source}</span>
      <span className="gen-node-name">{node.name}</span>
      {node.subtitle && <span className="gen-node-subtitle">{node.subtitle}</span>}
      {node.note && <p className="gen-node-note">{node.note}</p>}
    </div>
  );
}

export default function GenealogyChart({ data }: Props) {
  return (
    <ul className="gen-tree" aria-label="혈통 도표">
      <GenealogyBranch node={data} />
    </ul>
  );
}
