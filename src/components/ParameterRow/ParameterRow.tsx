import React from 'react';

interface ParametersRowProps {
  title: string,
  value: string | number,
}

function ParametersRow({
  title,
  value,
}: ParametersRowProps): React.ReactElement {
  return (
    <div className="characteristic">
      <div className="characteristic-name">{title}</div>
      <div>
        {value}
      </div>
    </div>
  );
}

export default ParametersRow;
