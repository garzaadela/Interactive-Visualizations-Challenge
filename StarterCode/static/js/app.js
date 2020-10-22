d3.json("samples.json").then((data)=>{
    console.log(data);

    data.names.forEach(menuData => {
        d3.select("#selDataset").append("option").text(menuData).property("value", menuData)

    });
});

function optionChanged(input) {
    console.log(input)
}

dropDownData = 947

function filterPlotData(dropDownData) {
    let filteredData = data.samples.filter(sampleData => sampleData.id === dropDownData);
    console.log(filteredData);
}
