# Task 3: Enhanced Data Visualization for Traders

## Overview

Updated the `Graph.tsx` and `DataManipulator.ts` files to improve data visualization for traders. The graph now tracks the ratio between two stocks over time and includes upper and lower bounds for trading signals.

## Changes Made

### `Graph.tsx`

- **Schema Update**: Modified the schema to track `ratio`, `upper_bound`, `lower_bound`, and `trigger_alert`. Added `price_abc` and `price_def` for ratio calculations.
- **Graph Configuration**:
  - **`view`**: Set to `y_line` for continuous line graph.
  - **`column-pivots`**: Removed to focus on stock ratios rather than individual prices.
  - **`row-pivots`**: Maintained for x-axis timestamps.
  - **`columns`**: Focused on `ratio`, `lower_bound`, `upper_bound`, and `trigger_alert`.
  - **`aggregates`**: Consolidated duplicate data points based on timestamp.
- **Lifecycle Methods**:
  - Updated `componentDidMount` to configure the graph with new fields.
  - Adjusted `componentDidUpdate` for proper data updates.

### `DataManipulator.ts`

- **Interface Update**: Adjusted `Row` interface to match the new schema.
- **Data Processing**:
  - Calculated `price_abc` and `price_def` from server data.
  - Computed `ratio` and set `upper_bound`, `lower_bound`, and `trigger_alert`.
  - Updated `generateRow` function to reflect changes and maintain data consistency.

## Result

- The graph now visualizes the ratio between two stocks, including upper and lower bounds, and alerts when bounds are crossed.
