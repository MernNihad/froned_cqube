// import React from 'react';
// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

// import { useStateContext } from '../../Contexts/ContextProvider';

// const Doughnut = ({ id, data, legendVisiblity, height }) => {
//   const { currentMode } = useStateContext();

//   return (
//     <AccumulationChartComponent
//       id={id}
//       legendSettings={{ visible: legendVisiblity, background: 'white' }}
//       height={height}
//       background={currentMode === 'Dark' ? '#33373E' : '#fff'}
//       tooltip={{ enable: true }}
//     >
//       <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
//       <AccumulationSeriesCollectionDirective>
//         <AccumulationSeriesDirective
//           name="Sale"
//           dataSource={data}
//           xName="x"
//           yName="y"
//           innerRadius="40%"
//           startAngle={0}
//           endAngle={360}
//           radius="70%"
//           explode
//           explodeOffset="10%"
//           explodeIndex={2}
//           dataLabel={{
//             visible: true,
//             name: 'text',
//             position: 'Inside',
//             font: {
//               fontWeight: '600',
//               color: '#fff',
//             },
//           }}
//         />
//       </AccumulationSeriesCollectionDirective>
//     </AccumulationChartComponent>
//   );
// };

// export default Doughnut;

import React from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../../Contexts/ContextProvider';

const Doughnut = ({ id, data, legendVisiblity, height }) => {
  const { currentMode } = useStateContext();
console.log(data,'dougnutdata');
  // Validate data
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisiblity, background: 'white' }}
      height={height}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Students"
          dataSource={data}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Doughnut;
