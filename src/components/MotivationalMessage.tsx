import './MotivationalMessage.css'

interface MotivationalMessageProps {
  message: string
}

/**
 * Display motivational message that changes based on guilt level
 */
export function MotivationalMessage({ message }: MotivationalMessageProps) {
  return (
    <div className="motivational-message">
      <p className="message-text">{message}</p>
    </div>
  )
}
