
/**
 * Deep clones an obj/array and manipulates the result if callback is provided  
 * @param {*} arr 
 * @param {callback} callback optional 
 */
export function deepCopy(arr, callback) {
  const copy = JSON.parse(JSON.stringify(arr));
  if(typeof callback === "function") {
    let copyModified = callback(copy);
    return copyModified || copy;
  }
  return copy;
} 

/* export function checkIfTyping() {
  
} */