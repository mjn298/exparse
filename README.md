#BERTHA

##Setup
BERTHA has two components, the express application, and the react application.
It was built using Node 14, and should be OK with Node >= 13.7. With lower versions I think you'll get problems
using modules because there is no code transformation step in the back end and this uses EJS modules (export {} and 
import {whatever} from 'somewhere')

NVM is a good way to manage different Node versions.

Once cloning/downloading the source code, perform `npm install` in both the `client` and `server` directories.
If there are issues with the install, delete the "package-lock.json" files in `client` and `server`. 

##Operation
After `npm install`, perform `npm start` in both the client and server directories.
The express application runs on port 5050 and the client is at port 5000. The server can also accept JSON payloads to
`http://localhost:<PORT>/parse` in the format specified in the assignment's description. I strongly recommend
consulting the client app as there is a lot of important usage information presented there.

##Application Design
I interpreted this as a language parser challenge, so the sever lexes both input and output
(see `server/src/DSL/ExpressionLexers` and `server/src/InputProcessor/InputLexers`) according to data definitions provided in
`server/src/common/definitions`. There is a very rudimentary parse tree in `server/src/DSL/parser` which tries to determine
which of the "Sentences" in `server/src/DSL/grammar` accommodates the input. Each `grammar` returns a function accepting an
array of lexed input items. The input is applied to the output in `server/src/evaluator.js`. See unit tests for more precise
examples of input and output in `server/spec`. I tried to be as pure as possible. There is some untouched code still in here,
when I was trying to be very exotic with function composition (the relative operations in `definitions` is an example of this).
The mental overhead without a typesystem made this very complicated and perhaps not worth it for an example application (I deliberately avoided typing in this to see if I could manage).

##Caveats
The error handling is terrible, if there is no evaluated response and no errors, it means the DSL input was grammatically incorrect.
Unfortunately, BERTHA does not tell you why, so you'll have to try something else. There is a lot of detail about what works,
and the syntax as specified in the project requirements have been verified in unit tests. Additionally, there is a small user guide in the front end app.