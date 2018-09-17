I noticed a problem with using HashedModuleIdsPlugin with externals where multiple keys map to the same value.

The hashed module ID will be based on the key of the first module webpack encounters that matches the key in the externals configuration. In our builds in CI, I have observed this hash changing back and forth between two values, which suggests that the order is not deterministic across our builds.

Diffing minified code of two builds that should be identical shows the following difference:

```diff
-        o = n("bhYp"),
+        o = n("G4xl"),
```

To reproduce this issue here:

1. Run `npm run build`.
2. The external logged to the console should read: `[c433] external "Object.assign" 42 bytes {main} [built]`
3. Inspect `dist/main.js`, paying attention to the hashed module ID for the external "Object.assign". You should see a line that looks like this:

  ```js
  /***/ "c433":
  ```
4. Change the order of the imports in `index.js`.
5. Run `npm run build` again.
6. The external logged to the console should read: `[jZRw] external "Object.assign" 42 bytes {main} [built]`
7. Inspect `dist/main.js`, looking for the same hashed module ID. You will now see a line that looks like this:

  ```js
  /***/ "jZRw":
  ```
