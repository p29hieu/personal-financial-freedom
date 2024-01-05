type MinimumParam = {
  initValue?: number;
  expectedInterestRate: number;
  inflationaryRate: number;
  minimumSpending: number;
};
export const useFinancialFreedom = () => {
  const calculateByCycle = ({
    cycle,
    expectedInterestRate,
    inflationaryRate,
    initValue = 0,
    minimumSpending,
  }: MinimumParam & { cycle: number }) => {
    const incomeTotal = Math.ceil(
      ((12 * minimumSpending) /
        (expectedInterestRate / 100 - inflationaryRate / 100) -
        initValue) /
        cycle
    );
    console.log(
      "===calculateByCycle",
      {
        cycle,
        expectedInterestRate,
        inflationaryRate,
        initValue,
        minimumSpending,
      },
      { incomeTotal }
    );
    return {
      incomeTotal,
    };
  };

  const calculateByIncome = ({
    incomeTotal,
    expectedInterestRate,
    inflationaryRate,
    initValue = 0,
    minimumSpending,
  }: MinimumParam & { incomeTotal: number }) => {
    const cycle = Math.ceil(
      ((12 * minimumSpending) /
        (expectedInterestRate / 100 - inflationaryRate / 100) -
        initValue) /
        incomeTotal
    );

    console.log(
      "===calculateByIncome",
      {
        incomeTotal,
        expectedInterestRate,
        inflationaryRate,
        initValue,
        minimumSpending,
      },
      { cycle }
    );
    return {
      cycle,
    };
  };

  return {
    calculateByCycle,
    calculateByIncome,
  };
};

// finallyAmount * (expectedInterestRate - inflationaryRate) = 12 * minimumSpending => finallyAmount = 12 * minimumSpending / (expectedInterestRate - inflationaryRate)

// cycle = (finallyAmount - initValue) / incomeTotal
//   = (12 * minimumSpending / (expectedInterestRate - inflationaryRate) - initValue) / incomeTotal

// incomeTotal = (finallyAmount - initValue) / cycle
