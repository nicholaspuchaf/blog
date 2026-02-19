export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  let fileName = searchParams.get('file');

  if (!fileName) {
    return new Response("Nome do arquivo não fornecido", { status: 400 });
  }

  const object = await context.env.MYR2_BUCKET.get(fileName);

  if (object === null) {
    return new Response("Imagem não encontrada", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body, { headers });
}