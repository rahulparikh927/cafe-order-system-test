import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("initial state", () => {
  render(<App />);
  expect(screen.getByText(/Items Ordered: 0/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Price: 0 yen/i)).toBeInTheDocument();
  expect(screen.getByText(/Items Ordered: 0/i)).toHaveAttribute("id", "count");
  expect(screen.getByText(/Total Price: 0 yen/i)).toHaveAttribute(
    "id",
    "price"
  );
  expect(
    screen.getByRole("button", { name: /coffee 480 yen/i })
  ).toHaveAttribute("id", "coffee");
  expect(screen.getByRole("button", { name: /tea 280 yen/i })).toHaveAttribute(
    "id",
    "tea"
  );
  expect(screen.getByRole("button", { name: /milk 180 yen/i })).toHaveAttribute(
    "id",
    "milk"
  );
  expect(screen.getByRole("button", { name: /coke 190 yen/i })).toHaveAttribute(
    "id",
    "coke"
  );
  expect(screen.getByRole("button", { name: /beer 580 yen/i })).toHaveAttribute(
    "id",
    "beer"
  );
});

test("ordering coffee updates count and price", () => {
  render(<App />);
  const coffeeButton = screen.getByRole("button", { name: /coffee 480 yen/i });
  fireEvent.click(coffeeButton);
  fireEvent.click(coffeeButton);
  expect(screen.getByText(/Items Ordered: 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Price: 960 yen/i)).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("2")).toHaveAttribute("id", "coffee-count");
});

test("ordering multiple drinks updates count and price", () => {
  render(<App />);
  const coffeeButton = screen.getByRole("button", { name: /coffee 480 yen/i });
  const milkButton = screen.getByRole("button", { name: /milk 180 yen/i });
  const beerButton = screen.getByRole("button", { name: /beer 580 yen/i });
  fireEvent.click(coffeeButton);
  fireEvent.click(coffeeButton);
  fireEvent.click(coffeeButton);
  fireEvent.click(milkButton);
  fireEvent.click(beerButton);
  fireEvent.click(beerButton);
  expect(screen.getByText(/Items Ordered: 6/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Price: 2780 yen/i)).toBeInTheDocument();
});

test("ordering each drink exactly once updates count and price", () => {
  render(<App />);
  const coffeeButton = screen.getByRole("button", { name: /coffee 480 yen/i });
  const teaButton = screen.getByRole("button", { name: /tea 280 yen/i });
  const milkButton = screen.getByRole("button", { name: /milk 180 yen/i });
  const cokeButton = screen.getByRole("button", { name: /coke 190 yen/i });
  const beerButton = screen.getByRole("button", { name: /beer 580 yen/i });
  fireEvent.click(coffeeButton);
  fireEvent.click(teaButton);
  fireEvent.click(milkButton);
  fireEvent.click(cokeButton);
  fireEvent.click(beerButton);
  expect(screen.getByText("Items Ordered: 5")).toBeInTheDocument();
  expect(screen.getByText("Total Price: 1710 yen")).toBeInTheDocument();
  expect(screen.getByTestId("coffee-count").textContent).toEqual("1");
  expect(screen.getByTestId("tea-count").textContent).toEqual("1");
  expect(screen.getByTestId("milk-count").textContent).toEqual("1");
  expect(screen.getByTestId("coke-count").textContent).toEqual("1");
  expect(screen.getByTestId("beer-count").textContent).toEqual("1");
});

test("ordering a large number of drinks updates count and price", () => {
  render(<App />);
  const coffeeButton = screen.getByRole("button", { name: /coffee 480 yen/i });
  for (let i = 0; i < 100; i++) {
    fireEvent.click(coffeeButton);
  }
  expect(screen.getByText("Items Ordered: 100")).toBeInTheDocument();
  expect(screen.getByText("Total Price: 48000 yen")).toBeInTheDocument();
  expect(screen.getByTestId("coffee-count").textContent).toEqual("100");
});
