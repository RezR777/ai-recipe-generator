export function request(ctx) {
    const { ingredients = [] } = ctx.args;

    const prompt = 'Suggest a recipe idea using these following ingredients: ${ingredients.join(", ")}.';

    return {
      resourcePath: '/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke',
      method: "POST",
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anthropic_version: "bedrock-2024-03-04",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: '\n\nHuman: ${prompt}\n\nAssistant:',
                },
                ],
            },
            ],
        }),
      },
    };
}

export function response(ctx) {
  const parsedBody = JSON.parse(ctx.result.body);
  const res = {
    body: parsedBody.content[0].text,
  };
  return res;
}
