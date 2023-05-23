class Designations {
  designations = [];
  constructor() {
    this.designations = [
      { designation: "Project Manager", designation_initials: "PM" },
      { designation: "Design Lead 1", designation_initials: "DL1" },
      { designation: "Design Lead 2", designation_initials: "DL2" },
      { designation: "Team Member 1", designation_initials: "TM1" },
      { designation: "Team Member 2", designation_initials: "TM2" },
      { designation: "Team Member 3", designation_initials: "TM3" },
      { designation: "Team Member 4", designation_initials: "TM4" },
    ];
  }
  getDesignation(index) {
    if (typeof index !== "number") {
      console.error("Index must be a number");
      return null;
    }
    let size = this.designations.length;
    if (size && typeof size === "number") {
      index = Math.min(index, size);
      return this.designations[index];
    }
    return null;
  }
}

export default new Designations();
