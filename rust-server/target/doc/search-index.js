var searchIndex = JSON.parse('{\
"rust_server":{"doc":"The Rust Axum AI Server for the Prooph-Board Chatbot <strong>Chaty</strong>.","t":"AAAADLLLLMLMLLLLLLMMLMMLLLLMLAAAAAAFFFFFFFFFAAANDENNNNNGNNLLLLLLMLLLLLLLMLLLLLMMLLLLLLLLMLLNNNNENGNLLLLLLLLLLLDEDDEDDEDDEDNNNNNNNNNNELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMLLLLLLLLLLLLLMMMMMMMMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLAAFFFFFFF","n":["config","handlers","models","utils","Config","borrow","borrow_mut","clone","clone_into","db_connection","eq","event_storming_script","fmt","from","from_ref","get_db_connection_string","get_ported_ip","into","ip","llm_connection","load_from_env","port","rag_script","to_owned","try_from","try_into","type_id","vector_query_script","vzip","ai","router","eventstorming","prompt","rating","regenerate","handle_eventstorming_post","testable_handle_eventstorming_post","handle_prompt_post","testable_handle_prompt_post","handle_rating_post","testable_handle_rating_post","handle_regenerate_post","testable_handle_regenerate_post","get_router","database","python_ai","routes_data","ConnectionError","DBConnectionInfo","DBError","Err","ExtensionError","InsertError","Ok","QueryError","Result","TableCreationError","UpdateError","borrow","borrow","borrow_mut","borrow_mut","clone","clone_into","dbname","eq","eq","fmt","fmt","from","from","from_ref","host","into","into","log_message","message","new","password","port","to_owned","to_string","try_from","try_from","try_into","try_into","type_id","type_id","user","vzip","vzip","Err","IOError","Ok","PathError","PythonError","ResponseError","Result","ScriptError","borrow","borrow_mut","eq","fmt","from","into","to_string","try_from","try_into","type_id","vzip","AIEventStormingRequest","AIEventStormingResponse","AIEventStormingResponseData","AIPromptRequest","AIPromptResponse","AIPromptResponseData","AIRatingRequest","AIRatingResponse","AIRatingResponseData","AIRegenerateRequest","AIRegenerateResponse","AIRegenerateResponseData","Error","Error","Error","Error","Existing","New","Success","Success","Success","Success","VectorSearchResult","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","from","from","from","from","from","from","from","from","from","from","from","from","from","id","id","id","into","into","into","into","into","into","into","into","into","into","into","into","into","message","message","prompt","prompt","prompt","rating","response","response","serialize","serialize","serialize","serialize","serialize","serialize","serialize","serialize","serialize","serialize","serialize","serialize","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","type_id","vzip","vzip","vzip","vzip","vzip","vzip","vzip","vzip","vzip","vzip","vzip","vzip","vzip","postgres","python","find_answer","get_connection","insert_answer","update_rating","handle_prompt_request","handle_vector_search","run_script"],"q":[[0,"rust_server"],[4,"rust_server::config"],[29,"rust_server::handlers"],[31,"rust_server::handlers::ai"],[35,"rust_server::handlers::ai::eventstorming"],[37,"rust_server::handlers::ai::prompt"],[39,"rust_server::handlers::ai::rating"],[41,"rust_server::handlers::ai::regenerate"],[43,"rust_server::handlers::router"],[44,"rust_server::models"],[47,"rust_server::models::database"],[91,"rust_server::models::python_ai"],[110,"rust_server::models::routes_data"],[272,"rust_server::utils"],[274,"rust_server::utils::postgres"],[278,"rust_server::utils::python"],[281,"core::fmt"],[282,"core::fmt"],[283,"core::result"],[284,"core::any"],[285,"axum::extract::state"],[286,"axum::json"],[287,"http::status"],[288,"axum::routing"],[289,"serde::de"],[290,"serde::ser"],[291,"tokio_postgres::client"],[292,"alloc::vec"]],"d":["This module contains the configuration settings for the …","This module contains the request handlers, handling the …","This module contains the data models used by the server.","This module contains utility functions used by the server …","Represents the configuration settings.","","","","","The connection information for the PostgreSQL database.","","The path to the Python event storming script file.","","Returns the argument unchanged.","","Gets the connection string for the database.","Gets the IP address and port of the server formatted as …","Calls <code>U::from(self)</code>.","The IP address of the server.","The connection string for the LLM Server (Ollama).","Loads the configuration from environment variables.","The port of the server.","The path to the Python RAG script file.","","","","","The path to the Python vector query script file.","","This module contains all the handlers for the AI routes.","This module contains the router generator with the routes.","This crate contains the handler for the <code>ai/eventstorming</code> …","This crate contains the handler for the <code>ai/prompt</code> route.","This crate contains the handler for the <code>ai/rating</code> route.","This crate contains the handler for the <code>ai/regenerate</code> …","Bridges the <code>testable_handle_eventstorming_post</code> to the Axum …","Handles the AI event storming request.","Bridges the <code>testable_handle_prompt_post</code> to the Axum Router.","Handles the AI prompt request.","Bridges the <code>testable_handle_rating_post</code> to the Axum Router.","Handles the AI rating request.","Bridges the <code>testable_handle_regenerate_post</code> to the Axum …","Handles the AI regenerate request.","Constructs and returns the axum router for the server.","This module contains database related data models.","This module contains the AI related data models.","This module contains the routes related data models.","Error related to the database connection.","Represents the database connection details.","Represents the possible errors that can occur during …","Contains the error value","Error related to installing an extension.","Error related to save data.","Contains the success value","Error related to query execution.","A type alias for a result that can return a value of type <code>T</code>…","Error related to table creation.","Error related to updating data.","","","","","","","The name of the database to access.","","","","","Returns the argument unchanged.","Returns the argument unchanged.","","The ip/url of the database.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Returns the error message for the logs.","Returns the error message for the Frontend.","Creates a new DBConnectionInfo instance.","The password to use for the connection.","The port of the database.","","Converts the DBConnectionInfo instance to a string …","","","","","","","The username to use for the connection.","","","Contains the error value","Error related to input/output operations.","Contains the success value","Error related to the file path.","Represents the possible errors that can occur in the …","Error related to the repsonse from the script.","A type alias for a result that can return a value of type <code>T</code>…","Error related to the execution of the script.","","","","","Returns the argument unchanged.","Calls <code>U::from(self)</code>.","Returns a string representation of the error.","","","","","Represents the request payload for the <code>ai/eventstorming</code> …","Represents the response or error for the <code>ai/eventstorming</code> …","Represents the response for the <code>ai/eventstorming</code> route.","Represents the request payload for the <code>ai/prompt</code> route.","Represents the response or error for the <code>ai/prompt</code> route.","Represents the response for the <code>ai/prompt</code> route.","Represents the request payload for the <code>ai/rating</code> route.","Represents the response or error for the <code>ai/rating</code> route.","Represents the response for the <code>ai/rating</code> route.","Represents the request payload for the <code>ai/regenerate</code> route.","Represents the response or error for the <code>ai/regenerate</code> …","Represents the response for the <code>ai/regenerate</code> route.","Represents an error response.","Represents an error response.","Represents an error response.","Represents an error response.","","","Represents a successful response.","Represents a successful response.","Represents a successful response.","Represents a successful response.","Represents the result of a vector search operation in …","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","The id of the answer from the Database.","The ID of the answer in the Database.","The ID of the answer in the Database.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","A message indicating the success of the rating operation.","The response from the AI model.","The prompt to send to the AI model.","The prompt to send to the AI model.","The prompt to send to the AI model.","The rating to give to the answer.","The response from the AI model.","The response from the AI model.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","This module contains utility functions for working with …","This module contains utility functions for working with …","Utility function to easily find an answer in the database.","Utility function to easily connect to the database.","Utility function to easily insert an answer into the …","Utility function to easily update the rating of an answer …","Handles the prompt request.","Handles the vector search request.","This function runs the Python AI model with the given …"],"i":[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,0,0,32,22,22,32,22,0,22,22,22,21,22,21,21,21,21,22,21,22,21,22,21,21,21,22,21,22,22,21,21,21,21,21,22,21,22,21,22,21,21,22,21,34,24,34,24,0,24,0,24,24,24,24,24,24,24,24,24,24,24,24,0,0,0,0,0,0,0,0,0,0,0,0,15,17,19,13,35,35,15,17,19,13,0,35,14,16,18,10,26,27,28,29,15,17,19,13,35,14,16,18,10,26,27,28,29,15,17,19,13,14,16,18,10,26,27,28,29,15,17,19,13,35,14,16,18,10,26,27,28,29,15,17,19,13,16,26,28,35,14,16,18,10,26,27,28,29,15,17,19,13,27,29,14,18,10,16,26,28,14,16,18,10,26,27,28,29,15,17,19,13,35,14,16,18,10,26,27,28,29,15,17,19,13,35,14,16,18,10,26,27,28,29,15,17,19,13,35,14,16,18,10,26,27,28,29,15,17,19,13,35,14,16,18,10,26,27,28,29,15,17,19,13,0,0,0,0,0,0,0,0,0],"f":[0,0,0,0,0,[-1,-2,[],[]],[-1,-2,[],[]],[1,1],[[-1,-2],2,[],[]],0,[[1,1],3],0,[[1,4],5],[-1,-1,[]],[-1,-1,[]],[1,6],[1,6],[-1,-2,[],[]],0,0,[[],1],0,0,[-1,-2,[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,8,[]],0,[-1,-2,[],[]],0,0,0,0,0,0,[[[9,[1]],[11,[10]]],[[2,[12,[11,[13]]]]]],[[1,10],[[2,[12,[11,[13]]]]]],[[[9,[1]],[11,[14]]],[[2,[12,[11,[15]]]]]],[[1,14],[[2,[12,[11,[15]]]]]],[[[9,[1]],[11,[16]]],[[2,[12,[11,[17]]]]]],[[1,16],[[2,[12,[11,[17]]]]]],[[[9,[1]],[11,[18]]],[[2,[12,[11,[19]]]]]],[[1,18],[[2,[12,[11,[19]]]]]],[1,20],0,0,0,0,0,0,0,0,0,0,0,0,0,0,[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[21,21],[[-1,-2],2,[],[]],0,[[22,22],3],[[21,21],3],[[22,4],5],[[21,4],5],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],0,[-1,-2,[],[]],[-1,-2,[],[]],[22,6],[22,6],[[6,23,6,6,6],21],0,0,[-1,-2,[],[]],[21,6],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,8,[]],[-1,8,[]],0,[-1,-2,[],[]],[-1,-2,[],[]],0,0,0,0,0,0,0,0,[-1,-2,[],[]],[-1,-2,[],[]],[[24,24],3],[[24,4],5],[-1,-1,[]],[-1,-2,[],[]],[24,6],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,8,[]],[-1,-2,[],[]],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,[[7,[14]]],25],[-1,[[7,[16]]],25],[-1,[[7,[18]]],25],[-1,[[7,[10]]],25],[-1,[[7,[26]]],25],[-1,[[7,[27]]],25],[-1,[[7,[28]]],25],[-1,[[7,[29]]],25],[-1,[[7,[15]]],25],[-1,[[7,[17]]],25],[-1,[[7,[19]]],25],[-1,[[7,[13]]],25],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],[-1,-1,[]],0,0,0,[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],0,0,0,0,0,0,0,0,[[14,-1],7,30],[[16,-1],7,30],[[18,-1],7,30],[[10,-1],7,30],[[26,-1],7,30],[[27,-1],7,30],[[28,-1],7,30],[[29,-1],7,30],[[15,-1],7,30],[[17,-1],7,30],[[19,-1],7,30],[[13,-1],7,30],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,[[7,[-2]]],[],[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,8,[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],[-1,-2,[],[]],0,0,[[21,31],[[32,[[2,[31,6]]]]]],[21,[[32,[33]]]],[[21,31,6],[[32,[31]]]],[[21,31,31],[[32,[2]]]],[[1,6],[[34,[6]]]],[[1,6],[[34,[35]]]],[[6,[36,[6]]],[[34,[6]]]]],"c":[],"p":[[3,"Config",4],[15,"tuple"],[15,"bool"],[3,"Formatter",281],[6,"Result",281],[3,"String",282],[4,"Result",283],[3,"TypeId",284],[3,"State",285],[3,"AIEventStormingRequest",110],[3,"Json",286],[3,"StatusCode",287],[4,"AIEventStormingResponse",110],[3,"AIPromptRequest",110],[4,"AIPromptResponse",110],[3,"AIRatingRequest",110],[4,"AIRatingResponse",110],[3,"AIRegenerateRequest",110],[4,"AIRegenerateResponse",110],[3,"Router",288],[3,"DBConnectionInfo",47],[4,"DBError",47],[15,"u16"],[4,"PythonError",91],[8,"Deserializer",289],[3,"AIPromptResponseData",110],[3,"AIRatingResponseData",110],[3,"AIRegenerateResponseData",110],[3,"AIEventStormingResponseData",110],[8,"Serializer",290],[15,"i32"],[6,"Result",47],[3,"Client",291],[6,"Result",91],[4,"VectorSearchResult",110],[3,"Vec",292]],"b":[]},\
"rust_server_bin":{"doc":"","t":"FF","n":["main","shutdown_signal"],"q":[[0,"rust_server_bin"]],"d":["Main function to start the server","Graceful shutdown signal"],"i":[0,0],"f":[[[],1],[[],1]],"c":[],"p":[[15,"tuple"]],"b":[]}\
}');
if (typeof window !== 'undefined' && window.initSearch) {window.initSearch(searchIndex)};
if (typeof exports !== 'undefined') {exports.searchIndex = searchIndex};
