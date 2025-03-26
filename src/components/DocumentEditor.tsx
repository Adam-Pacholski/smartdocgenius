
  // Update the updateEntry function to accept boolean values
  const updateEntry = (section: string, index: number, field: string, value: string | number | boolean) => {
    setMultiEntries(prev => {
      const newEntries = [...prev[section]];
      if (!newEntries[index]) {
        newEntries[index] = {};
      }
      newEntries[index][field] = value;
      
      const formattedString = formatEntriesToString(section, newEntries);
      handleChange(section, formattedString);
      
      return {
        ...prev,
        [section]: newEntries
      };
    });
  };
