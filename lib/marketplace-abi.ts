export const ABI = {"address":"0xa007e13d9a6ac196cacf33e077f1682fa49649f1aa3b129afa9fab1ea93501b","name":"marketplace","friends":["0xa007e13d9a6ac196cacf33e077f1682fa49649f1aa3b129afa9fab1ea93501b::market"],"exposed_functions":[{"name":"add_open_market","visibility":"friend","is_entry":false,"is_view":false,"generic_type_params":[{"constraints":[]}],"params":["address","address"],"return":[]},{"name":"available_marketplaces","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[],"params":["address"],"return":["0x1::simple_map::SimpleMap<address, 0x1::string::String>"]},{"name":"available_markets","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[{"constraints":[]}],"params":["address"],"return":["vector<address>"]},{"name":"create_marketplace","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[{"constraints":[]}],"params":["&signer","address"],"return":[]},{"name":"latest_price","visibility":"friend","is_entry":false,"is_view":false,"generic_type_params":[{"constraints":[]}],"params":["address"],"return":["u128"]},{"name":"marketplace_address","visibility":"public","is_entry":false,"is_view":true,"generic_type_params":[{"constraints":[]}],"params":["address"],"return":["address"]},{"name":"payout_marketplace","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[{"constraints":[]}],"params":["&signer","0x1::object::Object<0xa007e13d9a6ac196cacf33e077f1682fa49649f1aa3b129afa9fab1ea93501b::marketplace::Marketplace<T0>>","address"],"return":[]},{"name":"remove_open_market","visibility":"friend","is_entry":false,"is_view":false,"generic_type_params":[{"constraints":[]}],"params":["address","address"],"return":[]}],"structs":[{"name":"Marketplace","is_native":false,"abilities":["key"],"generic_type_params":[{"constraints":[]}],"fields":[{"name":"available_markets","type":"vector<address>"},{"name":"switchboard_feed","type":"address"}]},{"name":"MarketplaceList","is_native":false,"abilities":["key"],"generic_type_params":[],"fields":[{"name":"marketplaces","type":"0x1::simple_map::SimpleMap<address, 0x1::string::String>"}]},{"name":"ObjectController","is_native":false,"abilities":["key"],"generic_type_params":[],"fields":[{"name":"extend_ref","type":"0x1::object::ExtendRef"}]}]} as const
