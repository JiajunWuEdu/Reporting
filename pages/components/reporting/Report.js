import * as React from 'react';
import { visualizeImage, visualizeTable, basename, isFloat, roundFloat } from './html/Artifact';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Template = dynamic(() => import('./Template'), {
  ssr: false,
})

export const FactsheetContext = React.createContext();


const Report = React.forwardRef(({ template, value, runId, API_URL, flowData, onChange }, ref) => {
  const [currentFilledValues, setCurrentFilledValues] = React.useState(value);

  const [currentAutoCompleteList, SetAutoCompleteList] = React.useState([]);
  const [currentAutoReplaceList, SetAutoReplaceList] = React.useState([]);

  // const ref = React.useRef();
  React.useEffect(() => {
    if (typeof onChange === 'function') onChange(currentFilledValues);
  }, [currentFilledValues]);

  React.useEffect(() => {

    const autoCompleteList =
      flowData['metrics'].map(metric => {
        const metricValue = isFloat(metric.value) ? roundFloat(metric.value) : metric.value;
        return { label: "metric:" + metric.key + (metric.step > 0 ? ("." + metric.step) : '') + "(" + metricValue + ")", type: "variable", apply: "metric:" + metric.key + (metric.step > 0 ? ("." + metric.step) : '') + "" };
      })
        .concat(
          flowData['params'].map(param => ({ label: "param:" + param.key + "", type: "variable", apply: "param:" + param.key + "" }))
        ).concat(
          flowData['images'].map(image => ({ label: "image:" + basename(image.path) + "", type: "variable", apply: "image:" + basename(image.path) + "" }))
        ).concat(
          flowData['tables'].map(table => ({ label: "table:" + basename(table.path) + "", type: "variable", apply: "table:" + basename(table.path) + "" }))
        );

    SetAutoCompleteList(autoCompleteList);

    const autoReplaceList =
      flowData['metrics'].map(metric => (["metric:" + metric.key + (metric.step > 0 ? ("." + metric.step) : '') + "", metric.value]))
        .concat(
          flowData['params'].map(param => (["param:" + param.key + "", param.value]))
        ).concat(
          flowData['images'].map(image => (["image:" + basename(image.path) + "", visualizeImage(image, API_URL, runId)]))
        ).concat(
          flowData['tables'].map(table => (["table:" + basename(table.path) + "", visualizeTable(table, flowData['tableJSONs'])]))
        );

    SetAutoReplaceList(autoReplaceList);

  }, [flowData]);


  React.useEffect(() => {
    // console.log(currentFilledValues);
  }, [currentFilledValues]);

  return (
    <>
      <div ref={ref}>
        <Image src={logo} width="120" style={{ float: 'right' }} alt={'Logo'} />
        <p style={{ color: '#333333', fontStyle: 'italic', fontSize: '20px' }}>Corporate Model Risk (CMoR)</p>
        <p style={{ color: '#333333', fontSize: '28px' }}>Streamlined Validation Model Technical Specifications</p>
        <div style={{ height: '30px' }}></div>
        <FactsheetContext.Provider value={{ autoCompleteList: currentAutoCompleteList, autoReplaceList: currentAutoReplaceList, filledValues: currentFilledValues, setFilledValues: setCurrentFilledValues }}>
          <div>
            <Template content={template} />
          </div>
        </FactsheetContext.Provider>
       
 
      </div>
    </>

  );
});

export default Report;