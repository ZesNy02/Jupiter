var searchIndex = new Map(JSON.parse('[\
["rust_server",{"doc":"The Rust Axum AI Server for the Prooph-Board Chatbot <strong>Chaty</strong>.","t":"CCCCFPGPNNNNNNNNONNNNNNNNHNNNNNOOOONNNNNNNNCCCHHHHHHHHHHHCCCPFGPPPPIPPNNNNNNNNNNNONNNOONNNNNNNNOGPPPPPIPNNNNNNNNNFFGGFFPPPPNNNNNNNNNNNNNNNNNNNNNNNNOONNNNNNOOONNNNNNNNNNNNNNNNNNNNNNNNOCCHHHHH","n":["config","handlers","models","utils","Config","Dev","Mode","Prod","borrow","borrow","borrow_mut","borrow_mut","clone","clone","clone_into","clone_into","db_path","eq","eq","fmt","fmt","from","from","from_ref","from_ref","get_config","get_db_path","get_ported_ip","get_script_path","into","into","ip","mode","port","script","to_owned","to_owned","try_from","try_from","try_into","try_into","type_id","type_id","ai","db","router","handle_ai","handle_ai_dummy_err","handle_ai_dummy_ok","handle_ai_post","handle_db_post_edit","handle_db_post_fetch_all","handle_db_post_fetch_not_usefull","handle_db_post_fetch_usefull","handle_edit","handle_fetch","get_router","database","python_ai","routes_data","ConnectionError","DBEntry","DBError","Err","InsertError","Ok","QueryError","Result","TableCreationError","UpdateError","borrow","borrow","borrow_mut","borrow_mut","deserialize","eq","eq","fmt","fmt","from","from","id","into","into","new","prompt","response","serialize","to_string","try_from","try_from","try_into","try_into","type_id","type_id","usefull","AIError","EmptyResponse","Err","IOError","Ok","PathError","Result","ScriptError","borrow","borrow_mut","eq","fmt","from","into","try_from","try_into","type_id","AIPromptRequest","AIPromptResponse","AIResponse","DBFetchResponse","DBRatingEditRequest","EntryList","Error","Error","Success","Success","borrow","borrow","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","deserialize","deserialize","deserialize","deserialize","deserialize","deserialize","from","from","from","from","from","from","id","id","into","into","into","into","into","into","message","prompts","response","serialize","serialize","serialize","serialize","serialize","serialize","try_from","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","type_id","type_id","usefull","python","sqlite","run_ai","drop_table","fetch_prompts","insert_prompt","update_prompt"],"q":[[0,"rust_server"],[4,"rust_server::config"],[43,"rust_server::handlers"],[46,"rust_server::handlers::ai"],[50,"rust_server::handlers::db"],[56,"rust_server::handlers::router"],[57,"rust_server::models"],[60,"rust_server::models::database"],[96,"rust_server::models::python_ai"],[113,"rust_server::models::routes_data"],[183,"rust_server::utils"],[185,"rust_server::utils::python"],[186,"rust_server::utils::sqlite"],[190,"core::fmt"],[191,"core::fmt"],[192,"core::result"],[193,"core::any"],[194,"http::status"],[195,"axum::json"],[196,"axum::extract::state"],[197,"core::option"],[198,"axum::routing"],[199,"serde::de"],[200,"serde::ser"],[201,"alloc::vec"]],"d":["This module contains the configuration settings for the …","This module contains the request handlers for the server.","This module contains the data models used by the server.","This module contains utility functions used by the server.","Represents the configuration settings.","Development mode. This mode is used for testing and …","Represents the mode of the configuration.","Production mode. This mode is used for production …","","","","","","","","","The path to the SQLite database file.","","","","","Returns the argument unchanged.","Returns the argument unchanged.","","","Gets the configuration based on the mode and Docker flag.","Gets the path to the SQLite database file.","Gets the IP address and port of the server formatted as …","Gets the path to the Python script file, located in the …","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","The IP address of the server.","The mode of the configuration.","The port of the server.","The name of the Python script file..","","","","","","","","","This module contains the AI-related functionality.","This module contains the database-related functionality.","This module contains the router-related functionality.","Handles the AI request by running the AI model with the …","A dummy handler for testing purposes. Returns an internal …","A dummy handler for testing purposes. Returns a successful …","Handles the HTTP POST request for AI operations. Retrieves …","Function to handle the <strong>POST</strong> request to edit a prompt in …","Function to handle the <strong>GET</strong> request to fetch all prompts …","Function to handle the <strong>GET</strong> request to fetch all not …","Function to handle the <strong>GET</strong> request to fetch all usefull …","Handles the edit request by updating a prompt in the …","Handles the fetch request by fetching prompts from the …","Constructs and returns the axum router for the server.","This module contains the database functionality.","This module contains the Python AI functionality.","This module contains the data routes functionality.","Error related to the database connection.","Represents a prompt in the database.","Represents the possible errors that can occur during …","Contains the error value","Error related to save data.","Contains the success value","Error related to query execution.","A type alias for a result that can return a value of type <code>T</code>…","Error related to table creation.","Error related to updating data.","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Creates a new <code>Prompt</code> instance.","","","","Converts the <code>Prompt</code> instance to a string representation.","","","","","","","","Represents the possible errors that can occur in the AI …","Error indicating an empty response from the AI.","Contains the error value","Error related to input/output operations.","Contains the success value","Error related to the file path.","A specialized <code>Result</code> type for the AI module.","Error related to the execution of the script.","","","","","Returns the argument unchanged.","Calls <code>U::from(self)</code>.","","","","Represents a request for a prompt.","Represents a response to a prompt from the AI.","Represents the response from the AI model.","Represents the response when fetching prompts from the …","Represents a request to edit a prompt in the database.","Represents a list of prompts.","Represents an error response.","Represents an error response.","Represents a successful response with a list of prompts.","Represents a successful response with a prompt response.","","","","","","","","","","","","","","","","","","","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","The id of the prompt.","The id of the prompt to edit.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","The prompt to send to the AI.","The list of DBEntry.","The response from the AI.","","","","","","","","","","","","","","","","","","","","","","","","","The new rating of the prompt.","This module contains utility functions for working with …","This module contains utility functions for working with …","This function runs the Python AI model with the given …","NOTE: This function is only used in the tests","Function to fetch all prompts from the database and …","Function to insert a prompt with the given response into …","Function to update the usefullness of a prompt in the …"],"i":[0,0,0,0,0,1,0,1,1,2,1,2,1,2,1,2,2,1,2,1,2,1,2,1,2,0,2,2,2,1,2,2,2,2,2,1,2,1,2,1,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,0,0,29,22,29,22,0,22,22,22,20,22,20,20,22,20,22,20,22,20,20,22,20,20,20,20,20,20,22,20,22,20,22,20,20,0,25,28,25,28,25,0,25,25,25,25,25,25,25,25,25,25,0,0,0,0,0,0,17,12,17,12,26,27,10,16,17,12,26,27,10,16,17,12,26,27,10,16,17,12,26,27,10,16,17,12,27,16,26,27,10,16,17,12,10,26,27,26,27,10,16,17,12,26,27,10,16,17,12,26,27,10,16,17,12,26,27,10,16,17,12,16,0,0,0,0,0,0,0],"f":"````````{ce{}{}}000{bb}{dd}{{ce}f{}{}}0`{{bb}h}{{dd}h}{{bj}l}{{dj}l}{cc{}}000{{bh}d}{dn}00::````::{c{{A`{e}}}{}{}}000{cAb{}}0```{{dAd}{{Aj{AfAh}}}}{{}{{Aj{Af{Al{Ah}}}}}}{{{Al{Ad}}}{{Aj{Af{Al{Ah}}}}}}{{{An{d}}{Al{Ad}}}{{Aj{Af{Al{Ah}}}}}}{{{An{d}}{Al{B`}}}{{Aj{Afn}}}}{{{An{d}}}{{Aj{Af{Al{Bb}}}}}}00{{dB`}{{Aj{Afn}}}}{{d{Bd{h}}}{{Aj{AfBb}}}}{dBf}`````````````{ce{}{}}000{c{{A`{Bh}}}Bj}{{BlBl}h}{{BhBh}h}{{Blj}l}{{Bhj}l}{cc{}}0`66{{Bnnnh}Bh}``{{Bhc}A`C`}{Bhn}{c{{A`{e}}}{}{}}000{cAb{}}0`````````;;{{CbCb}h}{{Cbj}l}7=332``````````============{c{{A`{Cd}}}Bj}{c{{A`{Cf}}}Bj}{c{{A`{Ad}}}Bj}{c{{A`{B`}}}Bj}{c{{A`{Bb}}}Bj}{c{{A`{Ah}}}Bj}======``{ce{}{}}00000```{{Cdc}A`C`}{{Cfc}A`C`}{{Adc}A`C`}{{B`c}A`C`}{{Bbc}A`C`}{{Ahc}A`C`}{c{{A`{e}}}{}{}}00000000000{cAb{}}00000```{{dn}{{Ch{n}}}}{d{{Cj{f}}}}{{d{Bd{h}}}{{Cj{{Cl{Bh}}}}}}{{dCnCn}{{Cj{Bn}}}}{{dBnh}{{Cj{f}}}}","c":[],"p":[[6,"Mode",4],[5,"Config",4],[1,"unit"],[1,"bool"],[5,"Formatter",190],[8,"Result",190],[5,"String",191],[6,"Result",192],[5,"TypeId",193],[5,"AIPromptRequest",113],[5,"StatusCode",194],[6,"AIResponse",113],[1,"tuple"],[5,"Json",195],[5,"State",196],[5,"DBRatingEditRequest",113],[6,"DBFetchResponse",113],[6,"Option",197],[5,"Router",198],[5,"DBEntry",60],[10,"Deserializer",199],[6,"DBError",60],[1,"i64"],[10,"Serializer",200],[6,"AIError",96],[5,"EntryList",113],[5,"AIPromptResponse",113],[8,"Result",96],[8,"Result",60],[5,"Vec",201],[1,"str"]],"b":[]}],\
["rust_server_bin",{"doc":"","t":"HH","n":["main","shutdown_signal"],"q":[[0,"rust_server_bin"]],"d":["Main function to start the server","Graceful shutdown signal"],"i":[0,0],"f":"{{}b}0","c":[],"p":[[1,"unit"]],"b":[]}]\
]'));
if (typeof exports !== 'undefined') exports.searchIndex = searchIndex;
else if (window.initSearch) window.initSearch(searchIndex);