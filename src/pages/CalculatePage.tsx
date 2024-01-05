import { Button, Divider, Form, Input, InputNumber, Select, Space } from "antd";
import { useFinancialFreedom } from "../hooks/useFinancialFreedom";

type Props = {
  timestamp: Date;
};
export const loader = async (): Promise<Props> => {
  await new Promise((r) => setTimeout(r, 100));
  return {
    timestamp: new Date(),
  };
};

enum IncomeType {
  TotalIncome = "total_income",
  Accumulate = "accumulate",
}
const IncomeTypeValue: Record<IncomeType, string> = {
  [IncomeType.Accumulate]: "Tích luỹ thêm",
  [IncomeType.TotalIncome]: "Tổng thu nhập",
};

enum CalculateType {
  Income = "income",
  Cycle = "cycle",
}
const CalculateTypeValue: Record<CalculateType, string> = {
  [CalculateType.Income]: "Theo thu nhập",
  [CalculateType.Cycle]: "Theo chu kì",
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
type FormProps = {
  initValue: number;
  expectedInterestRate: number;
  inflationaryRate: number;
  minimumSpending: number;
  incomeType: IncomeType;
  incomeValue: number;
  calculateType: CalculateType;

  incomeTotal: number; // calculate
  cycle: number; // calculate
};
export const Component = () => {
  const [form] = Form.useForm<FormProps>();

  const { calculateByCycle, calculateByIncome } = useFinancialFreedom();

  const handleCalculateByIncome = () => {
    const { incomeType, incomeValue, minimumSpending } = form.getFieldsValue();
    let incomeTotal = 0;
    switch (incomeType) {
      case IncomeType.TotalIncome:
        incomeTotal = Number(incomeValue);
        break;
      case IncomeType.Accumulate:
        incomeTotal = Number(minimumSpending) + Number(incomeValue);
        break;
    }

    const { cycle } = calculateByIncome({
      ...form.getFieldsValue(),
      incomeTotal,
    });

    if (cycle) {
      form.setFieldsValue({
        cycle,
        incomeTotal,
      });
    }
  };

  const handleCalculateByCycle = () => {
    const { cycle } = form.getFieldsValue();
    const { incomeTotal } = calculateByCycle({
      ...form.getFieldsValue(),
      cycle,
    });
    if (incomeTotal) {
      form.setFieldsValue({ incomeTotal });
    }
  };

  const calculate = () => {
    const { calculateType } = form.getFieldsValue();
    switch (calculateType) {
      case CalculateType.Income:
        handleCalculateByIncome();
        return;
      case CalculateType.Cycle:
        handleCalculateByCycle();
        return;
    }
  };

  const onFinish = (values: FormProps) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="max-w-lg"
      >
        <Form.Item
          name="initValue"
          label="Tài sản hiện có"
          hasFeedback
          help="Số tài sản bạn đã có"
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            onChange={calculate}
            suffix="đ"
          />
        </Form.Item>
        <Form.Item
          name="expectedInterestRate"
          label="Lãi suất kì vọng (%)"
          rules={[{ required: true, min: 0, max: 100 }]}
          hasFeedback
          help="Lãi suất hàng năm mà bạn mong muốn"
          initialValue={8}
        >
          <Input
            suffix="%"
            type="number"
            min={0}
            max={100}
            onChange={calculate}
          />
        </Form.Item>
        <Form.Item
          name="inflationaryRate"
          label="Lạm phát mỗi năm (%)"
          rules={[{ required: true, min: 0, max: 100 }]}
          hasFeedback
          help="Lạm phát mỗi năm"
          initialValue={3}
        >
          <Input
            suffix="%"
            type="number"
            min={0}
            max={100}
            onChange={calculate}
          />
        </Form.Item>
        <Form.Item
          name="minimumSpending"
          label="Chi tiêu tối thiểu"
          rules={[{ required: true }]}
          hasFeedback
          help="Chi phí tối thiểu mỗi tháng của bạn"
          initialValue={12000000}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            onChange={calculate}
            suffix="đ/tháng"
          />
        </Form.Item>

        <Divider />

        <Form.Item
          name="calculateType"
          label="Loại tính"
          initialValue={CalculateType.Income}
          rules={[{ required: true }]}
        >
          <Select placeholder="Chọn loại tính mà bạn muốn" allowClear>
            {Object.entries(CalculateType).map(([key, value]) => (
              <Select.Option key={key} value={value}>
                {CalculateTypeValue[value]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.calculateType !== currentValues.calculateType
          }
        >
          {({ getFieldValue }) => (
            <Form.Item
              name="incomeValue"
              label="Loại thu nhập"
              help="Chọn loại thu nhập mà bạn muốn"
              rules={[{ required: true }]}
              hasFeedback
              hidden={getFieldValue("calculateType") !== CalculateType.Income}
            >
              <InputNumber
                className="w-full"
                addonBefore={
                  <Form.Item
                    name="incomeType"
                    noStyle
                    initialValue={IncomeType.TotalIncome}
                  >
                    <Select onChange={handleCalculateByIncome}>
                      {Object.entries(IncomeType).map(([key, value]) => (
                        <Select.Option key={key} value={value}>
                          {IncomeTypeValue[value]}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                }
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                onChange={handleCalculateByIncome}
                suffix="đ/tháng"
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.calculateType !== currentValues.calculateType ||
            prevValues.cycle !== currentValues.cycle
          }
        >
          {({ getFieldValue }) => (
            <Form.Item
              name="cycle"
              label="Thời gian cần"
              rules={[{ required: true, min: 0 }]}
              hasFeedback
            >
              <Input
                suffix="tháng"
                disabled={
                  getFieldValue("calculateType") !== CalculateType.Cycle
                }
                onChange={handleCalculateByCycle}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.calculateType !== currentValues.calculateType ||
            prevValues.incomeTotal !== currentValues.incomeTotal ||
            prevValues.minimumSpending !== currentValues.minimumSpending
          }
        >
          {({ getFieldValue }) => {
            return (
              <div
                hidden={getFieldValue("calculateType") !== CalculateType.Cycle}
              >
                <Form.Item name="incomeTotal" label="Tổng thu nhập ">
                  <InputNumber
                    className="w-full"
                    disabled
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    suffix="đ/tháng"
                  />
                </Form.Item>
                <Form.Item label="Tổng tích luỹ ">
                  <InputNumber
                    className="w-full"
                    disabled
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    value={
                      Number(getFieldValue("incomeTotal")) -
                        Number(getFieldValue("minimumSpending")) || ""
                    }
                    suffix="đ/tháng"
                  />
                </Form.Item>
              </div>
            );
          }}
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

Component.displayName = "CalculatePage";
