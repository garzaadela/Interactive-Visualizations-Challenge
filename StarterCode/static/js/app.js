var dataGlobal = []
d3.json("samples.json").then((data)=>{
    console.log(data);
    dataGlobal = data;

    data.names.forEach(menuData => {
        d3.select("#selDataset").append("option").text(menuData).property("value", menuData)

    });
});

function optionChanged(input) {
    filterPlotData(input)
    filterPanelData(input)
}

dropDownData = 947

function filterPlotData(dropDownData) {
    let filteredData = dataGlobal.samples.filter(sampleData => sampleData.id === dropDownData);
    console.log(filteredData);
}


function filterPanelData(subjectIdSelected) {
    let filteredData = dataGlobal.metadata.filter(sampleData => sampleData.id == subjectIdSelected);
    console.log(dataGlobal.metadata)
    console.log(filteredData);
    d3.select("#sample-metadata").html("")
    Object.entries(filteredData[0]).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("div").text(`${key.toUpperCase()}: ${value}`);
      });
}