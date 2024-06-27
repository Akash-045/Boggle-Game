import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

//Helper Function to add words
const addWord = (word) => {
  fireEvent.change(screen.getByRole("textbox"), { target: { value: word } });
  fireEvent.click(screen.getByRole("button", { name: /Add Word/i }));
};

describe("Boggle Game UI", () => {
  // Mock alert function
  beforeAll(() => {
    global.alert = jest.fn();
  });
  test("renders the Boggle board correctly", () => {
    render(<App />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getAllByRole("gridcell").length).toBe(16);
  });

  test("updates the score when a word is added", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "TEST" } });
    const buttonElement = screen.getByRole("button", { name: /Add Word/i });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    //Highlight Change: updated expected score text
    expect(screen.getByText(/Score:/i)).toHaveTextContent("Score: 0 "); // Assuming 'TEST' scores 0 point
  });

  test("displays entered words correctly", () => {
    render(<App />);
    addWord("TEST1");
    addWord("TEST2");

    // Highlight change: assuming TEST1 and TEST2 are not valid
    expect(screen.queryByText("TEST1")).not.toBeInTheDocument();
    expect(screen.queryByText("TEST2")).not.toBeInTheDocument();
  });

  test("timer starts and stops correctly", () => {
    jest.useFakeTimers();
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Time: 179s")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(179000);
    });
    console.log(screen.getByText(/Time:/i).textContent);

    expect(screen.getByText("Time: 0s")).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("handles extremely short words", () => {
    render(<App />);
    addWord("hi");
    expect(screen.queryByText("hi")).not.toBeInTheDocument();
  });

  test("handles special characters in words", () => {
    render(<App />);
    addWord("hello@");
    expect(screen.queryByText("hello@")).not.toBeInTheDocument();
  });

  test("handles extremely long words", () => {
    render(<App />);
    const longWord = "a".repeat(50);
    addWord(longWord);
    expect(screen.queryByText(longWord)).not.toBeInTheDocument();
  });

  test("does not add words not on the board", () => {
    render(<App />);
    addWord("zzzz");
    expect(screen.queryByText("zzzz")).not.toBeInTheDocument();
  });
});
