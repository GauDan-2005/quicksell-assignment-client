import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GroupingOption, SortingOption } from "../../utils/types";

import styles from "./DisplayMenu.module.scss";
import { images } from "../../constants/images";

interface DisplayMenuProps {
  grouping: GroupingOption;
  sorting: SortingOption;
  setGrouping: (grouping: GroupingOption) => void;
  setSorting: (sorting: SortingOption) => void;
}

export default function DisplayMenu({
  grouping,
  sorting,
  setGrouping,
  setSorting,
}: DisplayMenuProps) {
  const [isDisplayMenuOpen, setIsDisplayMenuOpen] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.displayMenu}>
        <button
          onClick={() => setIsDisplayMenuOpen(!isDisplayMenuOpen)}
          className={styles.displayButton}
        >
          <img src={images.display} alt="" />
          <span>Display</span>
          <ChevronDown className={styles.icon} />
        </button>
        {isDisplayMenuOpen && (
          <div className={styles.menuDropdown}>
            <div className={styles.menuContent}>
              <div className={styles.menuItem}>
                <p>Grouping</p>
                <select
                  value={grouping}
                  onChange={(e) =>
                    setGrouping(e.target.value as GroupingOption)
                  }
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className={styles.menuItem}>
                <p>Ordering</p>
                <select
                  value={sorting}
                  onChange={(e) => setSorting(e.target.value as SortingOption)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
