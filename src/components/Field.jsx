const Field = (props) => {
  const {
    className = '',
    id,
    label,
    type = 'text',
    onChange,
    value,
    ref,
    error,
  } = props

  return (
      <div className={`field ${className}`}>
        <label className="field__label" htmlFor="new-task">
         {label}
        </label>
        <input
          className={`field__input ${error ? 'is-invalid' : ''}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          type={type}
          value={value}
          onChange={onChange}
          ref={ref}
        />
        {error && (
          <span className="field__error" title={error}>{error}</span>
        )}
      </div>
  )
}

export default Field