export const successResponse = (
  data: any,
  statusCode = 200,
  message: string = 'Success',
) => {
  return { data, message, statusCode };
};
