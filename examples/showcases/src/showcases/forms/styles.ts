export const formsStyles = `
.forms-gallery h3 {
  margin: 24px 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--sg-color-text-secondary);
  border-bottom: 1px solid var(--sg-color-border-secondary);
  padding-bottom: 6px;
}
.forms-gallery h3:first-child {
  margin-top: 0;
}
.forms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.forms-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.forms-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--sg-color-text-secondary);
}
.forms-section {
  padding: 4px 0;
}
.forms-toolbar {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
}
.forms-toolbar > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wizard-content {
  min-height: 200px;
}
.wizard-actions {
  display: flex;
  gap: 8px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--sg-color-border-secondary);
}
.wizard-review {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.wizard-review-section h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--sg-color-text-secondary);
}
.wizard-review-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  font-size: 13px;
}
.wizard-review-row > span:first-child {
  color: var(--sg-color-text-secondary);
}

.dynamic-member-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  background: var(--sg-color-bg-secondary);
}
.dynamic-member-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  color: var(--sg-color-text-tertiary);
  flex-shrink: 0;
}
.dynamic-member-row .sg-field {
  flex: 1;
  margin: 0;
}

.playground-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.playground-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius-lg);
  padding: 20px;
}
.playground-card h4 {
  margin: 0 0 4px;
  font-size: 15px;
}
.playground-card > p {
  color: var(--sg-color-text-secondary);
  font-size: 13px;
  margin: 0 0 12px;
}
.search-results {
  margin-top: 12px;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  max-height: 200px;
  overflow-y: auto;
}
.search-result-item {
  padding: 8px 12px;
  font-size: 13px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  transition: background var(--sg-transition-duration);
}
.search-result-item:last-child {
  border-bottom: none;
}
.search-result-item:hover {
  background: var(--sg-color-bg-hover);
}

.mockup-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.mockup-card {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius-lg);
  padding: 32px;
  background: var(--sg-color-bg-container);
  box-shadow: var(--sg-shadow);
}
.mockup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
`
