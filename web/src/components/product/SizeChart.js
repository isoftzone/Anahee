const SizeChartModal = () => {
    return (
      <div className="size-chart-container p-3">
        {/* Western Wear Table */}
        <div className="size-chart-section mb-4">
          <h5 className="section-title mb-3 fw-bold text-primary">Western Wear</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Size</th>
                  <th scope="col">Bust</th>
                  <th scope="col">Waist</th>
                  <th scope="col">Hip</th>
                  <th scope="col">Shoulder</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'S', bust: 34, waist: 28, hip: 38, shoulder: 13.5 },
                  { size: 'M', bust: 36, waist: 30, hip: 40, shoulder: 14 },
                  { size: 'L', bust: 38, waist: 32, hip: 42, shoulder: 14.5 },
                  { size: 'XL', bust: 40, waist: 34, hip: 44, shoulder: 15 },
                  { size: 'XXL', bust: 42, waist: 36, hip: 46, shoulder: 15.5 },
                  { size: 'XXXL', bust: 44, waist: 38, hip: 48, shoulder: 16 }
                ].map((row) => (
                  <tr key={`western-${row.size}`}>
                    <td><strong>{row.size}</strong></td>
                    <td>{row.bust}</td>
                    <td>{row.waist}</td>
                    <td>{row.hip}</td>
                    <td>{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Kurta Sets Table */}
        <div className="size-chart-section">
          <h5 className="section-title mb-3 fw-bold text-primary">Kurta Sets </h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Size</th>
                  <th scope="col">Bust</th>
                  <th scope="col">Waist</th>
                  <th scope="col">Hip</th>
                  <th scope="col">Shoulder</th>
                  <th scope="col">Pant Length</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'S', bust: 36, waist: 32, hip: 40, shoulder: 14, pantLength: 37 },
                  { size: 'M', bust: 38, waist: 34, hip: 42, shoulder: 14.5, pantLength: 37 },
                  { size: 'L', bust: 40, waist: 36, hip: 44, shoulder: 15, pantLength: 38 },
                  { size: 'XL', bust: 42, waist: 38, hip: 46, shoulder: 15.5, pantLength: 38 },
                  { size: 'XXL', bust: 44, waist: 40, hip: 48, shoulder: 16, pantLength: 40 },
                  { size: 'XXXL', bust: 46, waist: 42, hip: 50, shoulder: 16.5, pantLength: 40 }
                ].map((row) => (
                  <tr key={`kurta-${row.size}`}>
                    <td><strong>{row.size}</strong></td>
                    <td>{row.bust}</td>
                    <td>{row.waist}</td>
                    <td>{row.hip}</td>
                    <td>{row.shoulder}</td>
                    <td>{row.pantLength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default SizeChartModal;