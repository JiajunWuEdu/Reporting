import Head from 'next/head'
import { Inter } from 'next/font/google'

import axios from "axios";

import Button from '@mui/material/Button';

import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import Report from './components/reporting/Report';

import { basename } from './components/reporting/html/Artifact';


import ReactToPrint from 'react-to-print';
import * as React from 'react';

const inter = Inter({ subsets: ['latin'] })
const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const runId = 'a99c3206eabd45a59bc9522515fe371d';
const API_URL = "http://47.89.45.223:5000/";

const template = [
  {
    type: 'style',
    prop: {
      children: `
    table.tpltable {
      border: 1px solid #000;
      border-collapse: collapse;
      margin: 30px auto;
      width: 100%;
      word-break: break-all;
    }
    
    table.tpltable>thead>tr>td,
    table.tpltable>tbody>tr>td {
      color: #000;
      border: 1px solid #000;
      padding: 5px;
    }
    
    table.tpltable>tbody>tr>td>div>div {
      margin: 10px;
      word-break: break-all;
      white-space: break-spaces;
    }
    
    table.tpltable>thead>tr>td {
      font-weight: bold;
      font-size: 16px;
      text-align: center;
    }
    
     
    table.tpltable>tbody>tr:first-child>td:first-child {
      width: 20%;
    }
    
    table.tpltable>tbody>tr>td:first-child {
      font-weight: bold;
    }
    
    table.tpltable>tbody>tr>td:last-child {
      font-weight: normal;
      width: 80%;
    }
    
    .html-body {
      user-select: none;
      cursor: pointer;
    }
    
    .html-body>table {
      border-spacing: 0;
      border-collapse: collapse;
      width: max-content;
      max-width: 100%;
      overflow: auto;
      width: 100%;
      height: 100%;
    }
    
    .html-body>table th {
      font-weight: 600;
    }
    
    .html-body>table th,
    .html-body>table td {
      width: auto;
      padding: 6px 13px;
      border: 1px solid #d0d7de;
    }
    
    .html-body>table tr {
      background-color: #ffffff;
      border-top: 1px solid hsla(210, 18%, 87%, 1);
    }
    
    .html-body>table tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    
    .html-body table img {
      background-color: transparent;
    }
    
    .html-body>img {
      width: 100%;
      height: 100%;
      max-width: 40vw;
    } 
    `
    }
  },
  {
    type: 'table',
    prop: { id: 'table1', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 2 },
                content: '1. Model objectives and Key model risks'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Business objective' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: {
                    id: 'md101', defaultValue: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            text:
                              'Try to type \/metric or \/image or \/table etc.',
                          },
                        ],
                      }
                    ]
                  }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Model use' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md102', defaultValue: '', placeholder: '' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Risk Rank' },
              {
                type: 'td', content: [{
                  type: 'SelectBox', prop: { id: 'md103', defaultValue: '1', options: [{ value: '1', text: '1' }, { value: '2', text: '2' }, { value: '3', text: '3' }, { value: '4', text: '4' }] }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'KMR and Failure mode' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md104', defaultValue: '', placeholder: 'Summarize harm to bank/consumers if model fails to performas expected.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Risk mitigation for KMR' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md105', defaultValue: '', placeholder: 'Summarize factors mitigating this risk.' }
                }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'table',
    prop: { id: 'table2', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 2 },
                content: '2. Model Framework'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Model Origin' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md201', defaultValue: '', placeholder: 'Specify in-house or vendor.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Algorithm' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md202', defaultValue: '', placeholder: 'Specify algorithm' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Assumptions' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md203', defaultValue: '', placeholder: 'State key assumptions.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Limitations' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md204', defaultValue: '', placeholder: 'State key model limitations.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Mitigating controls' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md205', defaultValue: '', placeholder: 'State key model limitations.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Variable selection strategy' },
              {
                type: 'td', content: [
                  {
                    type: 'HtmlBox', prop: { id: 'md206', defaultValue: '', placeholder: 'Summarize variable selection strategy.' }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    type: 'table',
    prop: { id: 'table3', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 2 },
                content: '3. Model Data'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              { type: 'td', prop: { rowSpan: 4 }, content: 'Data summary sources' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md301', defaultValue: '', placeholder: 'List data sources.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md302', defaultValue: '', placeholder: 'List upstream models' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md303', defaultValue: '', placeholder: 'Describe key inclusions/exclusions' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md304', defaultValue: '', placeholder: 'Provide data summary' }
                }
                ]
              }
            ]
          },

          {
            type: 'tr',
            content: [
              { type: 'td', prop: { rowSpan: 4 }, content: 'Indipendent variables' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md305', defaultValue: '', placeholder: 'Specify whether data are structured or unstructured' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md306', defaultValue: '', placeholder: 'Number of variables in the final model' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md307', defaultValue: '', placeholder: 'Provide variable names, descriptions/definition, and importance table\n in a subsection of the Appendix 1' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md308', defaultValue: '', placeholder: 'Assumptions / Limitations' }
                }
                ]
              }
            ]
          },



          {
            type: 'tr',
            content: [
              { type: 'td', prop: { rowSpan: 3 }, content: 'Dependent variable' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md309', defaultValue: '', placeholder: 'Form of dependent variable' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md310', defaultValue: '', placeholder: 'Definition' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md310', defaultValue: '', placeholder: 'Assumptions / Limitations' }
                }
                ]
              }
            ]
          },



          {
            type: 'tr',
            content: [
              { type: 'td', prop: { rowSpan: 3 }, content: 'Sample design' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md311', defaultValue: '', placeholder: 'Development/training sample: Size and sampling scheme' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md312', defaultValue: '', placeholder: 'In-time testing/holdout/validation sample: size and sampling scheme' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md313', defaultValue: '', placeholder: 'Out-of-time testing/holdout/validation sample: size and sampling scheme' }
                }
                ]
              }
            ]
          }




        ]
      }
    ]
  },

  {
    type: 'table',
    prop: { id: 'table4', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 2 },
                content: '4. Model performance'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Specification, interpretation, and explanablity' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md401', defaultValue: '', placeholder: 'Explain the model estimation results.\nFor traditional parametric models, provide full model specification in Appendix 1.\nFor AI/ML models, provide PDP graphs for key predictors in Appendix 1.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'KPIs' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md402', defaultValue: '', placeholder: 'List the KPIs.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Performance in development/training sample' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md403', defaultValue: '', placeholder: 'Figures and tables.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Performance in in-time/testing/holdout/validation sample.' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md404', defaultValue: '', placeholder: 'Figures and tables.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Performance in OOT testing/testing/holdout/validation sample' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md405', defaultValue: '', placeholder: 'Figures and tables.' }
                }
                ]
              }
            ]
          }
        ]
      }
    ]
  },




  {
    type: 'table',
    prop: { id: 'table5', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 2 },
                content: '5. Model implementation and control'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Implementation specification' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md401', defaultValue: '', placeholder: 'Explain the model estimation results.\nFor traditional parametric models, provide full model specification in Appendix 1.\nFor AI/ML models, provide PDP graphs for key predictors in Appendix 1.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'KPIs' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md402', defaultValue: '', placeholder: 'List the KPIs.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Performance in development/training sample' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md403', defaultValue: '', placeholder: 'Figures and tables.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Performance in in-time/testing/holdout/validation sample.' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md404', defaultValue: '', placeholder: 'Figures and tables.' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Performance in OOT testing/testing/holdout/validation sample' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md405', defaultValue: '', placeholder: 'Figures and tables.' }
                }
                ]
              }
            ]
          }
        ]
      }
    ]
  },


  {
    type: 'table',
    prop: { id: 'table6', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 2 },
                content: '6. Model monitoring'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'KPIs and thresholds' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md601', defaultValue: '', placeholder: '' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Frequency of monitoring untill full validation' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md602', defaultValue: '', placeholder: 'Quarterly or other' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Exit criteria and exit process' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md603', defaultValue: '', placeholder: '' }
                }
                ]
              }
            ]
          }
        ]
      }
    ]
  },


  {
    type: 'table',
    prop: { id: 'table8', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 2 },
                content: '7. Validation-on-Demand (VoD) results'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'Initial VoD output' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md801', defaultValue: '', placeholder: 'Provide link to output from initial VoD testing prescribed by CMoR' }
                }
                ]
              }
            ]
          },
          {
            type: 'tr',
            content: [
              { type: 'td', content: 'VoD tests for model monitoring' },
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md802', defaultValue: '', placeholder: 'Summarize model telemetry results...' }
                }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    type: 'table',
    prop: { id: 'table9', className: 'tpltable' },
    content: [
      {
        type: 'thead',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td',
                prop: { colSpan: 1 },
                content: '8. Validation conclusion'
              }
            ]
          }
        ]
      }, {
        type: 'tbody',
        content: [
          {
            type: 'tr',
            content: [
              {
                type: 'td', content: [{
                  type: 'HtmlBox', prop: { id: 'md901', defaultValue: '', placeholder: 'Please conclude here' }
                }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

];





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(6),
  margin: 'auto',
  color: theme.palette.text.secondary,
}));



export default function Home({ flowData }) {

  let ref = null;
  const value = {};
  const [currentFilledValues, setCurrentFilledValues] = React.useState(value);
  const [successSaved,setSuccessSaved] = React.useState(false);

  const handleChange = values => {
    setCurrentFilledValues(values);
  };

  const handleSave = () => {
    console.log(currentFilledValues);
    setSuccessSaved(true);
  };
  const handleCloseSaveAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessSaved(false);
  };
  

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ margin: '10px' }}>

          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            Save
          </Button>
          &nbsp;
          <ReactToPrint
            trigger={() => <Button variant="outlined" startIcon={<PrintIcon />}>
              Print to PDF
            </Button>}
            content={() => ref}
          />

        </div>

        <Box style={{ backgroundColor: '#cccccc', padding: '10px 0' }}>
          <Grid container spacing={1} columns={12} justifyContent="center">
            <Grid item lg={8} md={10} sm={11} xs={12}>
              <Item elevation={3}>
                <Report ref={el => (ref = el)} template={template} value={value} runId={runId} API_URL={API_URL} flowData={flowData} onChange={handleChange} />
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Snackbar open={successSaved} autoHideDuration={2000} onClose={handleCloseSaveAlert}>
          <Alert severity="success" sx={{ width: '100%' }} onClose={handleCloseSaveAlert}>
            Your report has been saved! (No backend API, just a demo)
          </Alert>
        </Snackbar>
      </main>
    </>
  )
}
export async function getServerSideProps() {

  let flowData = { metrics: [], params: [], images: [], tables: [], tableJSONs: {} };
  let response = null;

  response = await axios.get(API_URL + "ajax-api/2.0/mlflow/runs/get?run_id=" + runId);
  if (response.data) {
    flowData['metrics'] = response.data.run.data.metrics;
    flowData['params'] = response.data.run.data.params;
  }

  response = await axios.get(API_URL + "ajax-api/2.0/mlflow/artifacts/list?path=image&run_id=" + runId)
  if (response.data && response.data.files) {
    flowData['images'] = response.data.files;
  }

  response = await axios.get(API_URL + "ajax-api/2.0/mlflow/artifacts/list?path=table&run_id=" + runId)
  if (response.data && response.data.files) {
    flowData['tables'] = response.data.files;
  }

  for (let i = 0; i < flowData['tables'].length; i++) {
    const table = flowData['tables'][i];
    let response = await axios.get(API_URL + 'get-artifact?path=' + encodeURIComponent(table.path) + '&run_id=' + runId);
    if (response.data) {
      flowData['tableJSONs'][basename(table.path)] = response.data;
    }
  }

  return {
    props: {
      flowData
    },
  }
}