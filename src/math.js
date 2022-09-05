/**
 * Created on 1401/6/15 (2022/9/6).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export default function NumericalInvFunction (
  theFunction, [lowerBoundary, upperBoundary], precision = 1, xToFuncInputs = undefined,
) {
  const f = xToFuncInputs ? (x) => theFunction(xToFuncInputs(x)) : theFunction
  return numericalInvFunction
  
  function numericalInvFunction (expectedValue) {
    const y = expectedValue
    let x0 = lowerBoundary
    let x1 = upperBoundary
    
    let y0 = f(x0)
    if (abs(y0 - y) <= precision) return x0
    let y1 = f(x1)
    if (abs(y1 - y) <= precision) return x1
    if (y1 < y0) {
      const temp = y1
      x1 = lowerBoundary
      y1 = y0
      x0 = upperBoundary
      y0 = temp
    }
    
    if (y1 < y) return x1
    if (y < y0) return x0
    
    let x
    while (true) {
      x = ((x1 - x0) * y + x0 * y1 - x1 * y0) / (y1 - y0) // linear equation resolve
      const yy = f(x)
      if (abs(yy - y) <= precision) return x
      if (yy < y0 || y1 < yy) {
        return console.error(
          'Only monotonic functions can be resolved (estimated). Found unexpected value!\n' +
          'f(%f) === %f\n', x, yy, {x0, y0, x1, y1, y},
        )
      }
      if (isNaN(yy)) {
        return console.error(
          'Encountered an error during calculation!\n' +
          'f(%f) === %f\n', x, yy, {x0, y0, x1, y1, y},
        )
      }
      if (yy < y) {
        x0 = x
        y0 = yy
      } else {
        x1 = x
        y1 = yy
      }
    }
  }
}

const {abs} = Math
