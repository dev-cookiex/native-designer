export const moduleExists = ( pkg: string ) => {
  try {
    require.call( null, pkg )
    return true
  } catch { return false }
}

export const loadModule = <T>( pkg: string ): T | null => {
  if ( moduleExists( pkg ) ) return require.call( null, pkg )
  return null
}
