import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function DistributionChart({ graph }) {
  if (!graph?.points?.length) return null;
  const points = graph.points.map((point) => ({
    ...point,
    rejectY: point.region === 'reject' ? point.y : 0,
    acceptY: point.region === 'accept' ? point.y : 0,
    pValueY: point.isPValue ? point.y : 0
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <ComposedChart data={points} margin={{ top: 12, right: 20, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9e1ea" />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={42} />
          <Tooltip />
          <Area type="monotone" dataKey="acceptY" stroke="none" fill="#d7ede7" isAnimationActive={false} name="Acceptance region" />
          <Area type="monotone" dataKey="rejectY" stroke="none" fill="#f8cdd5" isAnimationActive={false} name="Rejection region" />
          <Area type="monotone" dataKey="pValueY" stroke="none" fill="#f4b95e" fillOpacity={0.45} isAnimationActive={false} name="p-value area" />
          <Line type="monotone" dataKey="y" stroke="#172033" strokeWidth={2} dot={false} name="Distribution curve" />
          {graph.criticalValues.filter((value) => Number.isFinite(value)).map((value) => (
            <ReferenceLine key={value} x={value} stroke="#b84a62" strokeDasharray="4 4" label={{ value: `crit ${value}`, fontSize: 11 }} />
          ))}
          <ReferenceLine x={graph.statistic} stroke="#1f7a68" strokeWidth={2} label={{ value: `stat ${graph.statistic}`, fontSize: 11 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
