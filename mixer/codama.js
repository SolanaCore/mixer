import { createCodamaConfig } from "gill";
 
export default createCodamaConfig({
  idl: "target/idl/mixer.json",
  clientJs: "../clients/js/src",
});
