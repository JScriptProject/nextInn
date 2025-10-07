 export const getChangedFields = (original, updated) => {
  
  if(Array.isArray(original) && Array.isArray(updated))
  {
    if(JSON.stringify(original) !== JSON.stringify(updated)){
      return updated;
    }
    return null;
  }
  
  

  const changes = {};
  console.log("CHNAGES =>",changes);
    Object.keys(updated).forEach((key) => {
      if (original[key] !== updated[key]) {
        changes[key] = updated[key];
      }
    });
    return changes;
  };