module.exports =  {
    env: {
      browser: true,
      jest: true
    },
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
      "airbnb-typescript",
    ],
    parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
      ecmaFeatures:  {
        jsx:  true,  // Allows for the parsing of JSX
      },
    },
    rules:  {
      "@typescript-eslint/explicit-function-return-type": 1,
      "@typescript-eslint/member-delimiter-style": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "arrow-parens": 0,
      "function-paren-newline": [ 0, "consistent" ],
      "implicit-arrow-linebreak": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": 0,
      "linebreak-style": 0,
      "no-bitwise": 0,
      "no-console": "off",
      "max-len": 0,
      "react/prop-types": 0,
      "no-plusplus": 0,
      "no-confusing-arrow": 0,
      "react/no-danger": 0,
      "no-mixed-operators": 0,
      "no-param-reassign": "off",
      "no-underscore-dangle": 0,
      "object-curly-newline": "off",
      "operator-linebreak": 0,
      "prefer-object-spread": 0,
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-props-no-spreading": 0,
      "react/state-in-constructor": 0,
      "react/destructuring-assignment": [2, "always", { "ignoreClassFields": true }],
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/interactive-supports-focus": 0,
      "jsx-a11y/no-noninteractive-element-interactions": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "jsx-a11y/control-has-associated-label": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "jsx-a11y/mouse-events-have-key-events": 0,
      "@typescript-eslint/interface-name-prefix": 0,
      "@typescript-eslint/camelcase": 0
    },
    settings:  {
      react:  {
        version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
      },
      // "import/extensions": [".js", ".jsx", ".scss"],
      "import/resolver": {
        "webpack": {
          "config": "./webpack.config.js"
        }
      },
    },
  };