function validateAIEnv() {
  const required = [
    "ACE_API_KEY",
    "ACE_BASE_URL",
    "ACE_MODEL",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(
        `Missing environment variable: ${key}`
      );
    }
  }
}

module.exports = {
  validateAIEnv,
};