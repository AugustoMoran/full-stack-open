const Notification = ({ message }) => {
  if (!message) return null

  const isError = message.includes('Error') || message.includes('Wrong') || message.includes('Could not')

  return (
    <div
      style={{
        color: isError ? '#d32f2f' : '#2e7d32',
        backgroundColor: isError ? '#ffcdd2' : '#c8e6c9',
        border: `2px solid ${isError ? '#d32f2f' : '#2e7d32'}`,
        padding: '12px 16px',
        marginBottom: '16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      {message}
    </div>
  )
}

export default Notification
