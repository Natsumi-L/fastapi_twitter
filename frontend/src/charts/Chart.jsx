import React from 'react'
import './Chart.css'
// import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


// import axios from 'axios';
import Highcharts from 'highcharts';

import wordCloud from 'highcharts-wordcloud';

require("highcharts/modules/wordcloud")(Highcharts);


function Chart() {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.',
    lines = text.split(/[,]+/g),
    data1 = lines.reduce((arr, word) => {
        let obj = Highcharts.find(arr, obj => obj.name === word);
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);


    const testChart = {
        title: {
            text: 'Peer Survey Word Cloud'
        },
        series: [{
            type: 'wordcloud',
            placementStrategy: 'random',
            data: data1,
            name: 'Frequency'
        }],

    }


    // const options = {
    //     accessibility: {
    //         screenReaderSection: {
    //             beforeChartFormat: '<h5>{chartTitle}</h5>' +
    //                 '<div>{chartSubtitle}</div>' +
    //                 '<div>{chartLongdesc}</div>' +
    //                 '<div>{viewTableButton}</div>'
    //         }
    //     },
    //     title: {
    //         text: 'Wordcloud of Lorem Ipsum'
    //     },
    //     series: [{
    //         type: 'wordcloud',
    //         data: [
    //             {
    //                 name: 'cooking',
    //                 weight: 5,
    //             },
    //             {
    //                 name: 'cleaning',
    //                 weight: 3,
    //             },
    //             {
    //                 name: 'singing',
    //                 weight: 1,
    //             },
    //         ],
    //         name: 'Occurrences'
    //     }],
    // }

    return (
        <div className='chart-container'>
            {/* <h1>asdfasdf</h1> */}
            {/* <HighchartsReact highcharts={Highcharts} options={testChart} /> */}
            <HighchartsReact
                    highcharts={Highcharts}
                    options={testChart} />
        </div>
    )
}

export default Chart;