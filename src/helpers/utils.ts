// Cria uma pausa assíncrona; a Promise só é concluída depois de `ms` milissegundos.
export function delay(ms: number) {
  // O setTimeout agenda a conclusão da Promise sem bloquear o restante da aplicação.
  return new Promise((resolve) => setTimeout(resolve, ms))
}
