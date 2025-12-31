import './GuiltMeter.css'

interface GuiltMeterProps {
  guiltPercentage: number
  color: string
}

/**
 * Visual guilt meter bar that animates from left to right
 * Shows remaining "guilt" or mental load
 */
export function GuiltMeter({ guiltPercentage, color }: GuiltMeterProps) {
  return (
    <div className="guilt-meter-container">
      <div className="guilt-meter-background">
        <div
          className="guilt-meter-fill"
          style={{
            width: `${guiltPercentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <div className="guilt-meter-label">
        <span className="guilt-percentage">{guiltPercentage}% Guilt</span>
        <span className="progress-percentage">{100 - guiltPercentage}% Done</span>
      </div>
    </div>
  )
}
