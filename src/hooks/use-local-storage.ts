import { useCallback, useEffect, useRef, useState } from 'react'

type SetValue<T> = (value: T | ((prev: T) => T)) => void

// Mesma API e mesmo comportamento do pacote `use-local-storage`, porém local.
// Motivo: o pacote é CommonJS e quebra no interop do rolldown-vite
// (o `default` chega como { default: fn } em vez da função).
//
// Detalhe importante: o navegador só dispara o evento "storage" para OUTRAS
// abas, nunca para a aba atual. Por isso, ao gravar, disparamos um evento
// "storage" manual — assim todas as chamadas de useLocalStorage com a mesma
// chave, na mesma aba, ficam sincronizadas.
export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, SetValue<T>] {
  // Guarda a última string salva, para não entrar em loop de atualização.
  const rawValueRef = useRef<string | null>(null)

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue

    try {
      rawValueRef.current = window.localStorage.getItem(key)
      return rawValueRef.current
        ? (JSON.parse(rawValueRef.current) as T)
        : defaultValue
    } catch {
      return defaultValue
    }
  })

  // Grava no localStorage e avisa as outras cópias (mesma aba e outras abas).
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const newValue = JSON.stringify(value)
      const oldValue = rawValueRef.current

      if (newValue === oldValue) return

      rawValueRef.current = newValue
      window.localStorage.setItem(key, newValue)

      window.dispatchEvent(
        new StorageEvent('storage', {
          storageArea: window.localStorage,
          url: window.location.href,
          key,
          newValue,
          oldValue,
        })
      )
    } catch {
      // storage cheio / indisponível — ignora
    }
  }, [key, value])

  // Escuta mudanças feitas por outras cópias do hook (mesma aba ou outra aba).
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== window.localStorage) return
      if (event.newValue === rawValueRef.current) return

      rawValueRef.current = event.newValue

      try {
        setValue(
          event.newValue ? (JSON.parse(event.newValue) as T) : defaultValue
        )
      } catch {
        setValue(defaultValue)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
    // defaultValue fica fora das deps de propósito, para não recriar o listener.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const set = useCallback<SetValue<T>>((next) => {
    setValue((prev) =>
      typeof next === 'function' ? (next as (p: T) => T)(prev) : next
    )
  }, [])

  return [value, set]
}
