import { RadialBar, RadialBarChart, Tooltip } from 'recharts';

const SurveyChart = ({ surveyVotes }) => {
  return (
    <div>
      {Object.keys(surveyVotes).map((surveyId) => {
        const data = [
          { name: 'Yes', value: surveyVotes[surveyId].yes, fill: '#0ACF58' },
          { name: 'No', value: surveyVotes[surveyId].no, fill: '#F67F0E' },
        ];

        return (
          <div className='bg-gradient-to-r from-slate-200 to-teal-300 rounded-xl p-4' key={surveyId}  style={{ marginBottom: '20px' }}>
            <h3 className='bg-orange-100 md:w-9/12 p-2 rounded-lg text-center'>{`Survey ID: ${surveyId}`}</h3>
            <RadialBarChart
              width={600}
              height={200}
              innerRadius="40%"
              outerRadius="100%"
              data={data}
              startAngle={90}
              endAngle={-180}
            >
              <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' fill='#0ACF58' />
              <Tooltip />
            </RadialBarChart>
          </div>
        );
      })}
    </div>
  );
};

export default SurveyChart;
