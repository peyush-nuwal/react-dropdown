export default {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
  