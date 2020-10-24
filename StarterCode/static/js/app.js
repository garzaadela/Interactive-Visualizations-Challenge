let dataGlobal = []
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



function filterPlotData(dropDownData) {
    let filteredData = dataGlobal.samples.filter(sampleData => sampleData.id === dropDownData);
    console.log(filteredData);

    let yticks = filteredData[0].otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barPlotData = [
      {
        y: yticks,
        x: filteredData[0].sample_values.slice(0, 10).reverse(),
        text: filteredData[0].otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
    let barPlotLayout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar", barPlotData, barPlotLayout);

    let trace1 = {
        x: filteredData[0].otu_ids,
        y: filteredData[0].sample_values,
        mode: 'markers',
        marker: {
            color: filteredData[0].otu_ids,
            size: filteredData[0].sample_values
        }
    };

    let bubbleData = [trace1];

    let layout = {
        title: 'Sample Values vs OTU IDs',
        showlegend: false,
        height: 600,
        width: 600
    };

    Plotly.newPlot('bubble', bubbleData, layout);
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