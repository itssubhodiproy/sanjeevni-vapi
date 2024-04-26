export const isPublicKeyMissingError = ({ vapiError }: { vapiError: any }) => {
  return !!vapiError && vapiError.error.statusCode === 403 && vapiError.error.error === "Forbidden";
};
