import styles from './Field.module.scss'

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
      <div className={`${styles.field} ${className}`}>
        <label className={styles.label} htmlFor="new-task">
         {label}
        </label>
        <input
          className={`${styles.input} ${error ? styles.isInvalid : ''}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          type={type}
          value={value}
          onChange={onChange}
          ref={ref}
        />
        {error && (
          <span className={styles.error} title={error}>{error}</span>
        )}
      </div>
  )
}

export default Field